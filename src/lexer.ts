import * as fs from 'fs';
import { stepInVehicle } from './LexerVehicle';

export type LexerCursor = { row: number; column: number };
export type LexerLocation = { start: LexerCursor; stop: LexerCursor };
export type LexerToken = { value: string; loc?: LexerLocation };
export type LexerOptions = { comments: boolean; location: boolean };

export class LexerError extends Error {
    /** @param {string} message */
    constructor(cursor: LexerCursor, message: string) {
        super(
            `[ZedScriptParse][Lexer][ERROR][${cursor.row}:${cursor.column}]\t:: ${message}`,
        );
        this.name = 'LexerError';
    }
}

export class LexerBag {
    inCommentBlock: boolean = false;
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

    commentLine() {
        this.next();
        const start = this.cursor();
        const value = this.until(['\n'], true)!!;
        const stop = this.cursor();
        return { loc: { start, stop }, value };
    }

    commentBlock() {
        this.inCommentBlock = true;
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
        this.inCommentBlock = false;
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
        if (!this.inCommentBlock) {
            if (c === '/' && this.peek() === '*') {
                this.comments.push(this.commentBlock());
                c = this.next();
            }
            if (c == '/' && this.peek() === '/') {
                this.comments.push(this.commentLine());
                c = this.next();
            }
        }
        return c;
    }

    until(
        patterns: string[],
        removePattern: boolean = false,
    ): string | undefined {
        let s = '';
        while (true) {
            if (this.isEOF()) return s;
            const c = this.next();
            if (c === undefined) return s;

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

    warn(
        message: string,
        cursor: LexerCursor = this.cursor(this.offset, true),
    ): void {
        console.warn(
            `[ZedScriptParse][Lexer][${cursor.row}:${cursor.column}]\t:: ${message}`,
        );
    }

    peek(offsetArg: number = 0): string | undefined {
        return this.raw[this.offset + offsetArg];
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export function checkProperty(
    bag: LexerBag,
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

    const cats = `[${categories.map((o) => o.toLowerCase()).join(', ')}]`;
    bag.error(
        `Cannot define ${property} in '${catLower}'. It is only allowed in ${cats}'.`,
    );
}

export function stepInOpenBracket(bag: LexerBag): string {
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

export function stepInObjectName(bag: LexerBag): string {
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

export function stepInProperty(
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
            cat.toLowerCase(),
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
                `Unexpected EOF in '${property}: ${module}.${definition}.${property}'`,
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
    removeWhitespace: boolean = true,
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

        function space(line: string): boolean {
            const [cat] = line.split(' ').map((o) => {
                return o.trim();
            });
            const prop = cat.toLowerCase();
            switch (prop) {
                case 'attachment':
                    checkProperty(bag, prop, 'model', category);
                    stepInProperty(bag, module, name, line, '=', false);
                    return true;
            }
            return false;
        }

        function noSpace(line: string): boolean {
            const prop = line.toLowerCase();
            switch (prop) {
                case 'copyframe':
                    checkProperty(bag, prop, 'animation', category);
                    stepInProperty(bag, module, name, prop, '=');
                    return true;
                case 'copyframes':
                    checkProperty(bag, prop, 'animation', category);
                    stepInProperty(bag, module, name, prop, '=');
                    return true;
                case 'clip':
                    checkProperty(bag, prop, 'sound', category);
                    stepInProperty(bag, module, name, prop, '=');
                    return true;
                case 'data':
                    checkProperty(bag, prop, 'vehicleenginerpm', category);
                    stepInProperty(bag, module, name, prop, '=');
                    return true;
            }
            return false;
        }

        if (line == undefined) {
            bag.error(`EOF in ${category}: ${module}.${name}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        if (line.indexOf(operator) !== -1) {
            if (removeWhitespace) {
                bag.token(
                    line.replace(/\,/g, '').replace(/\s/g, ''),
                    start,
                    stop,
                );
            } else {
                bag.token(line.replace(/\,/g, '').trim(), start, stop);
            }
            continue;
        } else if (line === ',') {
            continue;
        }

        if (line.indexOf(' ') !== -1) {
            if (space(line)) continue;
        } else {
            if (noSpace(line)) continue;
        }

        bag.error(`Illegal line in '${module}.${name}': ${line}`);
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
            bag.error(`Unexpected EOF in '${module}.${recipe}'`);
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

function stepInImports(bag: LexerBag, module: string) {
    bag.token(
        'imports',
        bag.cursor(bag.offset - 'imports'.length),
        bag.cursor(),
    );
    stepInOpenBracket(bag);
    while (!bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`Unexpected EOF in '${module}.Imports'`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        bag.token(line, start, stop);
    }
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function stepInModule(bag: LexerBag) {
    const module = stepInObjectName(bag);
    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const word = bag.until([' ', '\n', '}'])?.trim();
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
            case '':
                continue;
            case 'imports':
                stepInImports(bag, module);
                break;

            /* (Definitions using '=' assignments) */
            case 'item':
                stepInDefinition(bag, module, wordLower, '=', false);
                break;

            case 'animation':
            case 'animationsmesh':
            case 'mannequin':
            case 'model':
            case 'sound':
            case 'soundtimeline':
                stepInDefinition(bag, module, wordLower, '=');
                break;

            case 'vehicleenginerpm':
                stepInDefinition(bag, module, wordLower, '=', false);
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

            /* (Vehicles) */
            case 'template':
                stepInVehicle(bag, module, true);
                break;
            case 'vehicle':
                stepInVehicle(bag, module, false);
                break;

            default:
                bag.error('Unknown category: "' + wordLower + '"');
        }
    }
}

function stepInVersion(bag: LexerBag) {
    const expectsEquals = bag.until(['=']);
    if (expectsEquals === undefined) {
        bag.error('Unexpected EOF in version declaration.');
        return;
    }
    if (expectsEquals.indexOf('=') !== expectsEquals.length - 1) {
        bag.error("Expected '=' in version declaration.");
    }

    bag.token('=', bag.cursor(bag.offset - 2), bag.cursor(bag.offset - 1));

    let versionActual = bag.until([',', '\n']);
    if (versionActual === undefined) {
        bag.error('Unexpected EOF in version declaration.');
        return;
    }
    versionActual = versionActual.trim().replace(/\,/g, '');
    if (versionActual === '') {
        bag.error('Version is empty in version declaration.');
        return;
    }

    bag.token(
        versionActual,
        bag.cursor(bag.offset - versionActual.length),
        bag.cursor(bag.offset - 1),
    );
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export const tokenize = (
    path: string,
    options: Partial<LexerOptions> = { location: false },
): { tokens: LexerToken[] | string[]; comments?: LexerToken[] | string[] } => {
    const bag = new LexerBag(path, options);

    try {
        while (!bag.isEOF()) {
            const start = bag.cursor();
            const word = bag.until([' ', '\n'])?.trim();
            const stop = bag.cursor(bag.offset - 1);

            if (word == undefined) break;
            else if (word === '') continue;
            const wordLower = word.toLowerCase();
            switch (wordLower) {
                case 'module':
                    bag.token('module', start, stop);
                    stepInModule(bag);
                    break;
                case 'option':
                    stepInDefinition(bag, '[root]', 'option', '=', false);
                    break;
                case 'version':
                    bag.token('version', start, stop);
                    stepInVersion(bag);
                    break;
                default:
                    bag.warn(
                        `Ignoring unknown artifact: ${
                            word + ' ' + bag.until(['\n', 'undefined'], true)
                        }`,
                    );
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
    } catch (e) {
        const tokens = bag.tokens.map((o) => {
            return o.value;
        });
        const comments = bag.comments;
        const json = JSON.stringify({ tokens, comments }, null, 4);
        fs.writeFileSync('error_tokens.json', json);
        throw e;
    }
};
