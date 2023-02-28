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
            if (removeWhitespace) {
                bag.token(
                    line.replace(/\,/g, '').replace(/\s/g, ''),
                    start,
                    stop,
                );
            } else {
                bag.token(line.replace(/\,/g, '').trim(), start, stop);
            }
        } else if (line === ',') {
            continue;
        } else {
            const propertyLower = line.toLowerCase();
            console.log({ propertyLower });
            switch (propertyLower) {
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
                    stepInProperty(
                        bag,
                        module,
                        name,
                        propertyLower,
                        '=',
                        false,
                    );
                    break;

                case 'skin':
                    checkProperty(propertyLower, 'vehicle', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'sound':
                    checkProperty(propertyLower, 'vehicle', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'wheel':
                    checkProperty(propertyLower, 'vehicle', category);
                    stepInProperty(bag, module, name, propertyLower, '=');
                    break;
                case 'lightbar':
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
                        console.log({ propCategory });
                        switch (propCategory.toLowerCase()) {
                            case 'anim':
                                brk = true;
                                checkProperty(
                                    propertyLower,
                                    ['vehicle'],
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
                            case 'area':
                                brk = true;
                                checkProperty(
                                    propertyLower,
                                    ['vehicle'],
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
                            case 'part':
                                brk = true;
                                checkProperty(
                                    propertyLower,
                                    ['vehicle'],
                                    category,
                                );

                                stepInVehiclePart(
                                    bag,
                                    module,
                                    name,
                                    propertyLower,
                                );
                                break;
                            case 'passenger':
                                brk = true;
                                console.log(true);
                                checkProperty(
                                    propertyLower,
                                    ['vehicle'],
                                    category,
                                );

                                stepInVehiclePassenger(
                                    bag,
                                    module,
                                    name,
                                    propertyLower,
                                );
                                break;
                            case 'wheel':
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
                    break;
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

function stepInVehicleTemplate(bag: LexerBag, module: string) {
    let until = bag.until([' ', '\n', '{'], true);
    if (until !== 'vehicle') {
        bag.error(`Expected 'vehicle' '${bag.until(['\n'])}'`);
        return;
    }

    const catToken = 'template vehicle';
    bag.token(catToken, bag.cursor(bag.offset - catToken.length), bag.cursor());
    const name = stepInObjectName(bag);
    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`EOF in ${catToken}: ${module}.${name}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        if (line.indexOf('=') !== -1) {
            bag.token(line.replace(/\,/g, '').replace(/\s/g, ''), start, stop);
        } else if (line === ',') {
            continue;
        } else {
            if (line.indexOf(' ') !== -1) {
                const [propCategory, propName] = line.split(' ');
                console.log({ propCategory2: propCategory, propName });
                switch (propCategory.toLowerCase()) {
                    case 'attachment':
                        stepInProperty(bag, module, name, line, '=');
                        break;
                    case 'area':
                        stepInProperty(bag, module, name, line, '=');
                        break;
                    case 'part':
                        stepInVehiclePart(bag, module, name, propName);
                        break;
                    case 'passenger':
                        stepInVehiclePassenger(bag, module, name, propName);
                        break;
                    case 'wheel':
                        stepInProperty(bag, module, name, line, '=');
                        break;
                }
            } else {
                let brk = false;
                const lineLower = line.toLowerCase();
                switch (lineLower) {
                    case 'lightbar':
                        brk = true;
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'skin':
                        brk = true;
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'sound':
                        brk = true;
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                }
                if (!brk) {
                    bag.error(lineLower + ' ' + bag.peek(-2));
                }
            }
        }
    }
}

function stepInVehiclePart(
    bag: LexerBag,
    module: string,
    template: string,
    name: string,
) {
    bag.token(
        'part',
        bag.cursor(bag.offset - (name.length + 5)),
        bag.cursor(bag.offset - (name.length + 1)),
    );
    bag.token(name, bag.cursor(bag.offset - name.length), bag.cursor());

    stepInOpenBracket(bag);

    while (!bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`EOF in part: ${module}.${name}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        if (line.indexOf('=') !== -1) {
            bag.token(line.replace(/\,/g, '').replace(/\s/g, ''), start, stop);
        } else if (line === ',') {
            continue;
        } else {
            if (line.indexOf(' ') !== -1) {
                const [propCategory, propName] = line.split(' ');
                console.log({ propCategory, propName });
                switch (propCategory.toLowerCase()) {
                    case 'anim':
                        bag.token(
                            'anim',
                            bag.cursor(bag.offset - (name.length + 5)),
                            bag.cursor(bag.offset - (name.length + 1)),
                        );
                        stepInProperty(bag, module, name, propName, '=');
                        break;
                    case 'table':
                        stepInVehiclePartTable(bag, module, name, propName);
                        break;
                }
            } else {
                const lineLower = line.toLowerCase();
                console.log({ lineLower });
                switch (lineLower) {
                    case 'container':
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'door':
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'install':
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'lua':
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'uninstall':
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                    case 'window':
                        stepInProperty(bag, module, name, lineLower, '=');
                        break;
                }
            }
        }
    }
}

function stepInVehiclePassenger(
    bag: LexerBag,
    module: string,
    template: string,
    name: string,
) {
    bag.token(
        'passenger',
        bag.cursor(bag.offset - (name.length + 1 + 'passenger'.length)),
        bag.cursor(bag.offset - (name.length + 1)),
    );
    bag.token(name, bag.cursor(bag.offset - name.length), bag.cursor());

    stepInOpenBracket(bag);

    while (!bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`EOF in part: ${module}.${name}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        if (line.indexOf('=') !== -1) {
            bag.token(line.replace(/\,/g, '').replace(/\s/g, ''), start, stop);
        } else if (line === ',') {
            continue;
        } else {
            if (line.indexOf(' ') !== -1) {
                const [propCategory, propName] = line.split(' ');
                console.log({ propCategory, propName });
                switch (propCategory.toLowerCase()) {
                    case 'anim':
                        bag.token(
                            'anim',
                            bag.cursor(bag.offset - (name.length + 5)),
                            bag.cursor(bag.offset - (name.length + 1)),
                        );
                        stepInProperty(bag, module, name, propName, '=');
                        break;
                    case 'position':
                        bag.token(
                            'position',
                            bag.cursor(
                                bag.offset -
                                    (name.length + 1 + 'position'.length),
                            ),
                            bag.cursor(bag.offset - (name.length + 1)),
                        );
                        stepInProperty(bag, module, name, propName, '=', false);
                        break;
                    case 'switchseat':
                        bag.token(
                            'switchseat',
                            bag.cursor(
                                bag.offset -
                                    (name.length + 1 + 'switchseat'.length),
                            ),
                            bag.cursor(bag.offset - (name.length + 1)),
                        );
                        stepInProperty(bag, module, name, propName, '=');
                        break;
                }
            }
        }
    }
}

function stepInVehiclePartTable(
    bag: LexerBag,
    module: string,
    template: string,
    name: string,
) {
    bag.token(
        'table',
        bag.cursor(bag.offset - (name.length + 6)),
        bag.cursor(bag.offset - (name.length + 1)),
    );
    bag.token(name, bag.cursor(bag.offset - name.length), bag.cursor());

    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const start = bag.cursor();
        const line = bag.until([',', '\n', '}'])?.trim();
        const stop = bag.cursor(bag.offset - 1);

        if (line == undefined) {
            bag.error(`EOF in part: ${module}.${name}`);
            return;
        } else if (line === '' || line === ',') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        if (line.indexOf('=') !== -1) {
            bag.token(line.replace(/\,/g, '').replace(/\s/g, ''), start, stop);
        } else {
            const propertyLower = line.toLowerCase();
            if (line.indexOf(' ') !== -1) {
                const [propCategory] = line.split(' ');
                switch (propCategory.toLowerCase()) {
                }
            } else {
                switch (propertyLower) {
                    case 'items':
                        stepInVehiclePartTableItems(
                            bag,
                            module,
                            `${template}.${name}`,
                        );
                }
            }
        }
    }
}

function stepInVehiclePartTableItems(
    bag: LexerBag,
    module: string,
    name: string,
) {
    bag.token(
        'items',
        bag.cursor(bag.offset - (name.length + 6)),
        bag.cursor(bag.offset - (name.length + 1)),
    );

    stepInOpenBracket(bag);

    let brk = false;
    while (!brk && !bag.isEOF()) {
        const line = bag.until([',', '\n', '}'])?.trim();
        if (line == undefined) {
            bag.error(`EOF in part: ${module}.${name}`);
            return;
        } else if (line === '') {
            continue;
        } else if (line === '}') {
            bag.token('}', bag.cursor(bag.offset - 1), bag.cursor());
            break;
        }

        stepInProperty(bag, module, `${name}.items`, line.trim(), '=');
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
            bag.error(`EOF in imports: ${module}`);
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
            case 'animation':
            case 'animationsmesh':
            case 'item':
            case 'mannequin':
            case 'model':
            case 'sound':
            case 'soundtimeline':
                stepInDefinition(bag, module, wordLower, '=');
                break;

            /* (Vehicles) */
            case 'vehicle':
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

            case 'template': // "template vehicle {name}"
                stepInVehicleTemplate(bag, module);
                break;

            default:
                bag.error('Unknown category: "' + wordLower + '"');
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

    try {
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
    } catch (e) {
        fs.writeFileSync(
            'error.json',
            JSON.stringify(
                {
                    tokens: bag.tokens.map((o) => {
                        return o.value;
                    }),
                },
                null,
                4,
            ),
        );
        throw e;
    }
};
