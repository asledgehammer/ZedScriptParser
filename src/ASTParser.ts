import { EOF, tokenizeScript } from './utils';
import {
    AssignmentExpression,
    AssignmentOperator,
    AssignmentStatement,
    BooleanLiteral,
    Chunk,
    Expression,
    Identifier,
    ImportsStatement,
    ModuleConstructorExpression,
    NullLiteral,
    NumericArrayLiteral,
    NumericLiteral,
    ObjectConstructorExpression,
    ObjectStatement,
    StringArrayLiteral,
    Statement,
} from './ast';


export const categories: string[] = [];

export function parseAST(text: string, debug: boolean = false): Chunk {
    const tokens = tokenizeScript(text);

    if (debug) {
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
                        if (value === 'true') value = true;
                        else value = false;
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
                    literal = booleanLiteral(value as boolean);
                    break;
                case 'number':
                    literal = numericLiteral(value as number);
                    break;
                case 'string':
                    literal = stringLiteral(value as string);
                    break;
                case 'null':
                    literal = nullLiteral();
                    break;
                case 'numericarray':
                    literal = numericArrayLiteral(value as number[]);
                    break;
            }

            body.push(
                assignmentStatement(
                    name,
                    assignmentExpression(operator, literal),
                ),
            );
        };

        const onRecipeItems = (body: Statement[], items: string[]) => {
            body.push(
                assignmentStatement('__Items', stringArrayLiteral(items)),
            );
        };

        const onObjectProperty = (
            parentID: string,
            body: Statement[],
            name: string,
        ) => {
            const statement = assignmentStatement(
                name,
                objectConstructorExpression(),
            );
            const id = `${parentID}.${name}`;
            const sBody = (statement.value as ObjectConstructorExpression).body;

            const openBrace = next();
            if (openBrace == null) EOF(id);
            else if (openBrace !== '{') throw new Error(`${id} missing '{`);

            while (true) {
                const nextToken = next();
                if (nextToken === '}') break;
                else if (nextToken == null) EOF(id);

                if (peek() === '{') {
                    onObjectProperty(id, sBody, nextToken);
                } else if (peek(1) === '{') {
                    index++;
                    onObjectProperty(id, sBody, peek(-1));
                } else if (peek() === '=') {
                    onProperty(id, sBody, nextToken);
                } else {
                    throw new Error(peek());
                }
            }

            body.push(statement);
        };

        const onObject = (category: string) => {

            if(categories.indexOf(category) === -1) categories.push(category);

            const moduleID = module!!.id.value;
            let moduleBody = (module!!.value as ModuleConstructorExpression)
                .body;
            let name: string = next();
            while (true) {
                const n = next();
                if (n === '{') break;
                else if (n == null) EOF(category + '.' + name);
                name += ' ' + n;
            }
            object = newObject(category, name);

            const id = `${moduleID}.${name}`;
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

            moduleBody.push(object);
            object = undefined;
        };

        const onImports = () => {
            if (debug) console.log('onImports()');
            const openBrace = next();
            if (openBrace == null) EOF('imports');
            else if (openBrace !== '{') throw new Error(`Imports missing '{`);

            const imports: Identifier[] = [];

            while (true) {
                const nextToken = next();
                if (nextToken === '}') break;
                else if (nextToken == null) EOF('imports');
                imports.push(identifier(nextToken));
            }

            const body = (module!!.value as ModuleConstructorExpression).body;
            body.push(importsStatement(imports));
        };

        const onModule = () => {
            if (module != null) {
                throw new Error(`Cannot call 'module' inside module.`);
            }
            let id: string = '';
            while (true) {
                const n = next();
                if (n === '{') break;
                else if (n == null) EOF(id);
                id += n;
            }

            if (id === '') throw new Error('Module name is empty string.');

            module = assignmentStatement(id, moduleConstructor());

            while (true) {
                const nextToken = next();
                if (nextToken === '}') break;
                else if (nextToken === 'imports') onImports();
                else onObject(nextToken);
            }

            chunk.push(module);
            module = undefined;
        };

        if (tokenLower === 'module') onModule();
    }

    categories.sort((a, b) => a.localeCompare(b));

    return chunk;
}

export function objectConstructorExpression(
    body: AssignmentStatement[] = [],
): ObjectConstructorExpression {
    return { type: 'ObjectConstructorExpression', body };
}

export function identifier(name: string): Identifier {
    return { type: 'Identifier', value: name };
}

export function moduleConstructor(): ModuleConstructorExpression {
    return { type: 'ModuleConstructorExpression', body: [] };
}

export function newObject(category: string, name: string): ObjectStatement {
    return {
        type: 'ObjectStatement',
        category: identifier(category),
        id: identifier(name),
        value: { type: 'ObjectConstructorExpression', body: [] },
    };
}

export function assignmentStatement(
    name: string,
    value: Expression,
): AssignmentStatement {
    return { type: 'AssignmentStatement', id: identifier(name), value };
}

export function assignmentExpression(
    operator: AssignmentOperator,
    value: Expression,
): AssignmentExpression {
    return { type: 'AssignmentExpression', operator, value };
}

function stringArrayLiteral(value: string[]): StringArrayLiteral {
    return { type: 'StringArrayLiteral', value };
}

export function nullLiteral(): NullLiteral {
    return { type: 'NullLiteral' };
}

export function booleanLiteral(value: boolean): BooleanLiteral {
    return { type: 'BooleanLiteral', value };
}

export function numericLiteral(value: number): NumericLiteral {
    return { type: 'NumericLiteral', value };
}

export function numericArrayLiteral(values: number[]): NumericArrayLiteral {
    return { type: 'NumericArrayLiteral', value: values };
}

export function stringLiteral(value: string) {
    return { type: 'StringLiteral', value };
}

export function importsStatement(values: Identifier[]): ImportsStatement {
    return { type: 'ImportStatement', value: values };
}
