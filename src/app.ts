/** NOTE: Do not consider this to be final, acceptable code. This is the initial code to get a working AST export. */

import * as fs from 'fs';
import {
    AssignmentStatement,
    Chunk,
    Identifier,
    ImportsStatement,
    ModuleConstructorExpression,
    ObjectConstructorExpression,
    ObjectStatement,
    RecipeItemsExpression,
    Statement,
} from 'Script';

export function tokenizeScript(text: string): string[] {
    const removeComments = (t: string): string => {
        let pruned = '';

        let layersIn = 0;
        for (let index = 0; index < t.length; ) {
            if (t[index] === '/' && t[index + 1] === '*') {
                layersIn++;
                index += 2;
            } else if (t[index] === '*' && t[index + 1] === '/') {
                layersIn--;
                index += 2;
            } else {
                if (layersIn > 0) {
                    index++;
                    continue;
                }
                pruned += t[index++];
            }
        }

        return pruned;
    };

    const removeTrash = (s: string) => {
        // I have no idea why PZ's parser tolerates two commas in a row..
        return s.replace(/,,/g, '');
    };

    const lines = removeTrash(removeComments(text)).split(/\r\n/g);

    let tokens: string[] = [];

    for (let line of lines) {
        line = line.trim();

        /* (IGNORE COMMENT-LINES) */
        if (line.indexOf('/*') !== -1) {
            continue;
        }

        const lineTokens = line
            .replace(/(?<=\s)/g, ' ')
            .split(/ (.*?)(?=\s)/)
            .filter((s) => {
                return s !== '\n' && s !== '\t' && s !== '';
            });

        for (let token of lineTokens) {
            token = token.trim();
            if (token === '') continue;
            if (token !== ',' && token.indexOf(',') !== -1) {
                const split = token.split(',');
                for (let s of split) {
                    if (s === '') s = ',';
                    tokens.push(s);
                }
            } else {
                tokens.push(token);
            }
        }
    }

    let oldTokens = [...tokens];
    tokens = [];

    for (const token of oldTokens) {
        if (token !== ':' && token.indexOf(':') !== -1) {
            const split = token.split(':');
            tokens.push(split[0]);
            tokens.push(':');
            tokens.push(split[1]);
        } else {
            tokens.push(token);
        }
    }

    oldTokens = [...tokens];
    tokens = [];

    for (const token of oldTokens) {
        if (token !== '=' && token.indexOf('=') !== -1) {
            if (token.indexOf('=') === 0) {
                tokens.push('=');
                tokens.push(token.substring(1));
            } else if (token.indexOf('=') === token.length - 1) {
                tokens.push(token.substring(0, token.length - 1));
                tokens.push('=');
            } else {
                const split = token.split('=');
                for (const s of split) {
                    tokens.push(s);
                    tokens.push('=');
                }
                tokens.pop();
            }
        } else {
            tokens.push(token);
        }
    }

    return tokens;
}

function identifier(name: string): Identifier {
    return {
        type: 'Identifier',
        value: name,
    };
}

function moduleConstructor(): ModuleConstructorExpression {
    return {
        type: 'ModuleConstructorExpression',
        body: [],
    };
}

function newObject(category: string, name: string): ObjectStatement {
    return {
        type: 'ObjectStatement',
        category: identifier(category),
        id: identifier(name),
        value: {
            type: 'ObjectConstructorExpression',
            body: [],
        },
    };
}

function EOF(id: string) {
    throw new Error(`Unexpected EOF while parsing '${id}'`);
}

export function parse(text: string, debug: boolean = false): Chunk {
    const tokens = tokenizeScript(text);

    if (debug) {
        console.log('tokens: ');
        console.log(tokens);
    }

    let module: AssignmentStatement | undefined;
    let object: ObjectStatement | undefined;
    const chunk: Chunk = [];
    let index = 0;

    while (true) {
        const next = (): string => {
            return tokens[index++];
        };

        const peek = (offset: number = 0): string => {
            return tokens[index + offset];
        };

        const token = next();

        /* (Nominal EOF) */
        if (token == null) break;

        const tokenLower = token.toLowerCase();

        const onProperty = (
            parentID: string,
            body: Statement[],
            name: string,
        ) => {
            if (debug) console.log(`onProperty(${parentID}.${name})`);
            const operator = next();
            if (operator !== '=' && operator !== ':') {
                throw new Error();
            }

            let literal: any | undefined;
            let value: boolean | number | number[] | string | string[] = next();
            let type:
                | 'null'
                | 'string'
                | 'number'
                | 'numericarray'
                | 'boolean' = 'string';
            const id = parentID + '.' + name;

            if (value === ',') {
                console.warn(
                    `The value for '${id}' is empty. Interpreting as null..`,
                );
                value = '';
                type = 'null';
            } else {
                let isArray = false;
                let n;
                while (true) {
                    const n = next();
                    if (n === ',') break;
                    else if (n == null) EOF(id);
                    if (typeof value === 'string') {
                        value = [value];
                        isArray = true;
                    }
                    value.push(n);
                }

                if (isArray) {
                    let isNumericArray = true;

                    for (const x of value as string[]) {
                        const y = parseFloat(x);
                        if (isNaN(y) || !isFinite(y)) {
                            isNumericArray = false;
                            break;
                        }
                    }

                    if (isNumericArray) {
                        const newValue: number[] = [];
                        for (const x of value as string[]) {
                            newValue.push(parseFloat(x));
                        }
                        value = newValue;
                        type = 'numericarray';
                    } else {
                        value = (value as string[]).join(' ');
                    }
                } else {
                    if (value === 'true' || value === 'false') {
                        type = 'boolean';
                    } else {
                        let parsed: number = parseFloat(value as string);
                        if (!isNaN(parsed) && isFinite(parsed)) {
                            value = parsed;
                            type = 'number';
                        }
                    }
                }
            }

            // console.log({ id, type, value });

            switch (type) {
                case 'boolean':
                    literal = {
                        type: 'BooleanLiteral',
                        value,
                    };
                    break;
                case 'number':
                    literal = {
                        type: 'NumericLiteral',
                        value,
                    };
                    break;
                case 'string':
                    literal = {
                        type: 'StringLiteral',
                        value,
                    };
                    break;
                case 'null':
                    literal = {
                        type: 'NullLiteral',
                    };
                    break;
                case 'numericarray':
                    literal = {
                        type: 'NumericArrayLiteral',
                        values: value,
                    };
                    break;
            }

            body.push({
                type: 'AssignmentStatement',
                id: identifier(name),
                value: {
                    type: 'AssignmentExpression',
                    operator,
                    value: literal,
                },
            });
        };

        const onRecipeItems = (body: Statement[], items: string[]) => {
            const recipe: RecipeItemsExpression = {
                type: 'RecipeItemsExpression',
                values: items,
            };

            body.push({
                type: 'AssignmentStatement',
                id: identifier('__Items'),
                value: recipe,
            });
        };

        const onObjectProperty = (
            parentID: string,
            body: Statement[],
            name: string,
        ) => {
            const statement: AssignmentStatement = {
                type: 'AssignmentStatement',
                id: identifier(name),
                value: {
                    type: 'ObjectConstructorExpression',
                    body: [],
                },
            };

            const id = `${parentID}.${name}`;

            const openBrace = next();
            if (openBrace == null) {
                EOF(id);
            } else if (openBrace !== '{') {
                throw new Error(`${id} missing '{`);
            }

            while (true) {
                const nextToken = next();
                if (nextToken === '}') break;
                else if (nextToken == null) EOF(id);

                if (peek() === '{') {
                    onObjectProperty(
                        id,
                        (statement.value as ObjectConstructorExpression).body,
                        nextToken,
                    );
                } else if (peek(1) === '{') {
                    index++;
                    onObjectProperty(
                        id,
                        (statement.value as ObjectConstructorExpression).body,
                        peek(-1),
                    );
                } else if (peek() === '=') {
                    onProperty(
                        id,
                        (statement.value as ObjectConstructorExpression).body,
                        nextToken,
                    );
                } else {
                    throw new Error(peek());
                }
            }

            body.push(statement);
        };

        const onObject = (category: string) => {
            let name: string = next();
            while (true) {
                const n = next();
                if (n === '{') break;
                else if (n == null) EOF(category + '.' + name);
                name += ' ' + n;
            }
            object = newObject(category, name);

            const id = `${module?.id.value}.${name}`;
            if (debug) console.log(`onObject(${id})`);

            while (true) {
                const token = tokens[index];
                const nextToken = next();
                if (nextToken === '}') break;
                else if (nextToken == null) EOF(id);

                if (nextToken === 'import') {
                } else if (peek() === '{') {
                    onObjectProperty(id, object.value.body, nextToken);
                    continue;
                } else if (peek(1) === '{') {
                    index++;
                    onObjectProperty(id, object.value.body, peek(-1));
                } else if (peek() === '=' || peek() === ':') {
                    onProperty(id, object.value.body, nextToken);
                } else if (category === 'recipe') {
                    onRecipeItems(object.value.body, token.split('/'));
                } else {
                    throw new Error(
                        `${peek(-2)} ${peek(-1)} ${peek(0)} ${peek(1)} ${peek(
                            2,
                        )}`,
                    );
                }
            }

            (module!!.value as ModuleConstructorExpression).body.push(object);
            object = undefined;
        };

        const onImports = () => {
            if (debug) console.log('onImports()');
            const openBrace = next();

            if (openBrace == null) {
                EOF('imports');
            } else if (openBrace !== '{') {
                throw new Error(`Imports missing '{`);
            }

            const imports: Identifier[] = [];

            while (true) {
                const nextToken = next();
                if (nextToken === '}') break;
                else if (nextToken == null) EOF('imports');

                imports.push(identifier(nextToken));
            }

            const importStatement: ImportsStatement = {
                type: 'ImportStatement',
                value: imports,
            };
            if (debug) console.log({ importStatement });
            (module!!.value as ModuleConstructorExpression).body.push(
                importStatement,
            );
        };

        const onModule = () => {
            if (module != null) {
                throw new Error(`Cannot call 'module' while in module.`);
            }

            let id: string = '';
            while (true) {
                const n = next();
                if (n === '{') break;
                else if (n == null) EOF(id);
                id += n;
            }

            if (id === '') throw new Error('Module name is empty string.');

            module = {
                type: 'AssignmentStatement',
                id: identifier(id),
                value: moduleConstructor(),
            };

            let nextToken;

            while (true) {
                nextToken = next();
                if (nextToken === '}') break;

                if (nextToken === 'imports') {
                    onImports();
                } else {
                    onObject(nextToken);
                }
            }

            chunk.push(module);
            if (debug) console.log({ module });
            module = undefined;
        };

        if (tokenLower === 'module') onModule();
    }

    return chunk;
}

export function scanDir(dir: string, extension: string, files: string[]) {
    extension = extension.toLowerCase();
    const entries = fs.readdirSync(dir);
    const dirs: string[] = [];

    for (const entry of entries) {
        const path = dir + '/' + entry;
        if (path === '.' || path === '..' || path === '...') continue;
        const stats = fs.lstatSync(path);
        if (stats.isDirectory() && dirs.indexOf(path) === -1) {
            dirs.push(path);
            continue;
        }
        if (
            path.toLowerCase().endsWith(extension) &&
            files.indexOf(path) === -1
        ) {
            files.push(path);
        }
    }

    if (dirs.length !== 0) {
        for (const dir of dirs) scanDir(dir, extension, files);
    }
}

const doFolder = (path: string, debug: boolean = false) => {
    const files: string[] = [];
    scanDir(path, '.txt', files);
    files.sort((a, b) => a.localeCompare(b));

    for (const file of files) {
        doFile(file, debug);
    }
};

const doFile = (path: string, debug: boolean = false) => {
    console.log(`[ZedScriptParse] :: Parsing '${path}'`);
    const ast = parse(fs.readFileSync(path).toString(), debug);
    fs.writeFileSync(
        path.replace('.txt', '.ast.json'),
        JSON.stringify(ast, null, 4),
    );
};

doFolder('./assets/media/scripts');
