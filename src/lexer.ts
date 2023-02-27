import * as fs from 'fs';

export type LexerCursor = { row: number; column: number };
export type LexerLocation = { start: LexerCursor; stop: LexerCursor };
export type LexerToken = { value: string; loc?: LexerLocation };
export type LexerOptions = { comments: boolean; location: boolean };

export class LexerError extends Error {
    /** @param {string} message */
    constructor(cursor: LexerCursor, message: string) {
        super(`[${cursor.row}:${cursor.column}] :: ${message}`);
        this.name = 'LexerError';
    }
}

export class LexerBag {
    comments: LexerToken[] = [];
    tokens: LexerToken[] = [];
    options: Partial<LexerOptions>;
    raw: string;
    offset: number = 0;

    constructor(path: string, options: Partial<LexerOptions>) {
        this.raw = fs.readFileSync(path).toString().replace(/\r/g, '');
        this.options = options;
    }

    token(value: string, start: LexerCursor, stop: LexerCursor): void {
        this.tokens.push(
            this.options.location ? { value, loc: { start, stop } } : { value },
        );
    }

    isEOF(): boolean {
        return this.offset >= this.raw.length;
    }

    comment() {
        this.next();
        const start = this.cursor();
        let value = '';
        let layersIn = 1;
        while (layersIn > 0) {
            if (this.peek() === '/' && this.peek(1) === '*') {
                layersIn++;
                this.offset += 2;
            } else if (this.peek() === '*' && this.peek(1) === '/') {
                layersIn--;
                this.offset += 2;
            } else {
                value += this.raw[this.offset++];
            }
        }
        const stop = this.cursor();
        return { loc: { start, stop }, value: `${value}` };
    }

    cursor(o: number = this.offset, force: boolean = false): LexerCursor {
        const c = { row: 1, column: 1 };
        if (!this.options.location && !force) {
            return { row: -1, column: -1 };
        }
        for (let i = 0; i < o; i++) {
            const char = this.raw[i];
            if (char === '\n') {
                c.row++;
                c.column = 1;
            } else {
                c.column++;
            }
        }
        return c;
    }

    next(): string {
        let c = this.raw[this.offset++];
        if (c === '/' && this.peek() === '*') {
            this.comments.push(this.comment());
            c = this.next();
        }
        return c;
    }

    until(
        patterns: string[],
        removePattern: boolean = false,
    ): string | undefined {
        let s = '';
        while (true) {
            if (this.isEOF()) {
                return undefined;
            }
            const c = this.next();
            s += c;

            for (const pattern of patterns) {
                if (s.indexOf(pattern) !== -1) {
                    if (removePattern) {
                        s = s.substring(0, s.length - pattern.length);
                    }
                    return s;
                }
            }
        }
    }

    print(message: string): void {
        const cursor = this.cursor();
        console.log(`[${cursor.row}:${cursor.column}] :: ${message}`);
    }

    error(
        message: string,
        cursor: LexerCursor = this.cursor(this.offset, true),
    ): void {
        throw new LexerError(cursor, message);
    }

    peek(offsetArg: number = 0): string | undefined {
        return this.raw[this.offset + offsetArg];
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function stepInOpenBracket(bag: LexerBag): string {
    if (bag.peek() === '{') {
        const start = bag.cursor();
        bag.next();
        const stop = bag.cursor();
        const token: LexerToken = { value: '{' };
        if (bag.options.location) token.loc = { start, stop };
        bag.tokens.push(token);
        return '{';
    }

    let value;
    do {
        value = bag.next();
    } while (value !== '{' && value != null);
    const start = bag.cursor(bag.offset - 1);
    const stop = bag.cursor();

    if (value === undefined) {
        bag.error(`Unexpected EOF. (Expected '{')`);
    }

    if (value !== '{') {
        bag.error(`Unexpected ${value}. (Expected: '{', Given: '${value}')`);
    }

    const token: LexerToken = { value };
    if (bag.options.location) token.loc = { start, stop };
    bag.tokens.push(token);

    return '{';
}

function stepInObjectName(bag: LexerBag): string {
    const start = bag.cursor();
    const value = bag.until(['{', '\n'])!!.trim();
    if (value === '') bag.error('Name is empty.');

    const stop = bag.cursor(bag.offset - 1);
    const token: LexerToken = { value };
    if (bag.options.location) token.loc = { start, stop };
    bag.tokens.push(token);
    return value;
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function stepInProperty(
    bag: LexerBag,
    module: string,
    definition: string,
    property: string,
    operator: '=' | ':',
    removeWhitespace: boolean = true,
) {
    const propLower = property.toLowerCase();

    if (property.indexOf(' ') !== -1) {
        const [cat, name] = property.split(' ');
        bag.token(
            cat,
            bag.cursor(),
            bag.cursor(bag.offset - (property.length - cat.length)),
        );
        bag.token(
            name,
            bag.cursor(bag.offset - (property.length - cat.length) + 1),
            bag.cursor(),
        );
    } else {
        bag.token(
            propLower,
            bag.cursor(bag.offset - propLower.length),
            bag.cursor(),
        );
    }

    stepInOpenBracket(bag);

    while (!bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '}', '\n'])?.trim();
        const stop = bag.cursor();

        if (line == undefined) {
            bag.error(
                `Unexpected EOF in ${property}: ${module}.${definition}.${property}`,
            );
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        if (line.indexOf(operator) === -1) {
            if (line === ',') continue;
            bag.error(
                `Illegal line in ${module}.${definition}.${property}: ${line}`,
            );
        }

        let l = line.replace(/\,/g, '');
        if (removeWhitespace) l = l.replace(/\s/g, '');
        bag.token(l, start, stop);
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function stepInDefinition(
    bag: LexerBag,
    module: string,
    category: string,
    operator: '=' | ':',
) {
    const catLower = category.toLowerCase();
    bag.token(catLower, bag.cursor(bag.offset - catLower.length), bag.cursor());
    const name = stepInObjectName(bag);
    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`EOF in ${category}: ${module}.${name}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        function checkProperty(
            property: string,
            categories: string[] | string,
            categoryGiven: string,
        ) {
            const catLower = categoryGiven.toLowerCase();
            if (typeof categories === 'string') categories = [categories];
            for (const catExp of categories) {
                const catExpLower = catExp.toLowerCase();
                if (catLower === catExpLower) {
                    return;
                }
            }

            const cats = `[${categories
                .map((o) => o.toLowerCase())
                .join(', ')}]`;
            bag.error(
                `Cannot define ${property} in '${catLower}'. It is only allowed in ${cats}'.`,
            );
        }

        if (line.indexOf(operator) !== -1) {
            bag.token(line.replace(/\,/g, '').replace(/\s/g, ''), start, stop);
        } else if (line === ',') {
            continue;
        } else {
            const propertyLower = line.toLowerCase();
            switch (propertyLower) {
                case 'attachment':
                    checkProperty(
                        propertyLower,
                        ['model', 'vehicle'],
                        category,
                    );
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'copyframe':
                    checkProperty(propertyLower, 'animation', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'copyframes':
                    checkProperty(propertyLower, 'animation', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'clip':
                    checkProperty(propertyLower, 'sound', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'model':
                    checkProperty(propertyLower, 'vehicle', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'skin':
                    checkProperty(propertyLower, 'vehicle', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'data':
                    checkProperty(propertyLower, 'vehicleenginerpm', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                default:
                    let brk = false;
                    if (line.indexOf(' ') !== -1) {
                        const [propCategory] = line.split(' ');
                        switch (propCategory.toLowerCase()) {
                            case 'attachment':
                                brk = true;
                                checkProperty(
                                    propertyLower,
                                    ['model', 'vehicle'],
                                    category,
                                );

                                stepInProperty(
                                    bag,
                                    module,
                                    name,
                                    propertyLower,
                                    '=',
                                    false,
                                );
                                break;
                        }
                    }
                    if (!brk) {
                        bag.error(
                            `Illegal line in '${module}.${name}': ${line}`,
                        );
                    }
            }
        }
    }
}

function stepInRecipe(bag: LexerBag, module: string, category: string) {
    const catLower = category.toLowerCase();
    bag.token(catLower, bag.cursor(bag.offset - catLower.length), bag.cursor());
    const recipe = stepInObjectName(bag);
    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`EOF in recipe: ${module}.${recipe}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        bag.token(line.replace(/\,/g, '').replace(/\s/g, ''), start, stop);
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function stepInModule(bag: LexerBag) {
    const module = stepInObjectName(bag);
    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const word = bag.until([' ', '}'])?.trim();
        if (word === undefined) {
            bag.error(`EOF in module: ${module}`);
            return;
        }

        const wordLower = word.toLowerCase();
        switch (wordLower) {
            /* (TERMINATOR) */
            case '}':
                bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
                brk = true;
                break;

            /* (Definitions using '=' assignments) */
            case 'animation':
            case 'animationsmesh':
            case 'item':
            case 'mannequin':
            case 'model':
            case 'sound':
            case 'soundtimeline':
            case 'vehicle':
            case 'vehicleenginerpm':
                stepInDefinition(bag, module, wordLower, '=');
                break;

            /* (Definitions using ':' assignments) */
            case 'fixing':
            case 'multistagebuild':
                stepInDefinition(bag, module, wordLower, ':');
                break;

            /* (Recipe Definitions) */
            case 'evolvedrecipe':
            case 'recipe':
            case 'uniquerecipe':
                stepInRecipe(bag, module, wordLower);
                break;
        }
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const tokenize = (
    path: string,
    options: Partial<LexerOptions> = { location: false },
): { tokens: LexerToken[] | string[]; comments?: LexerToken[] | string[] } => {
    const bag = new LexerBag(path, options);

    while (!bag.isEOF()) {
        const start = bag.cursor();
        const word = bag.until([' '])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (word == undefined) break;
        const wordLower = word.toLowerCase();

        switch (wordLower) {
            case 'module':
                bag.token('module', start, stop);
                stepInModule(bag);
                break;
        }
    }

    if (options.location) {
        return {
            tokens: bag.tokens,
            comments: options?.comments ? bag.comments : undefined,
        };
    } else {
        return {
            tokens: bag.tokens.map((o) => {
                return o.value;
            }),
            comments: options.comments
                ? bag.comments.map((o) => {
                      return o.value;
                  })
                : undefined,
        };
    }
};
