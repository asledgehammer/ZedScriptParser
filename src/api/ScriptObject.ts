import {
    AssignmentStatement,
    ImportsStatement,
    ObjectStatement,
    Statement,
} from 'ast';

export type ScriptBoolean = boolean | undefined;
export type ScriptFloat = number | undefined;
export type ScriptInt = number | undefined;
export type ScriptString = string | undefined;
export type ScriptIntArray = number[] | undefined;
export type ScriptFloatArray = number[] | undefined;
export type ScriptStringArray = string[] | undefined;

export function getString(
    statement: AssignmentStatement,
    discardNullOrWhitespace: boolean = false,
): ScriptString {
    if (statement.value.type !== 'AssignmentExpression') {
        throw new Error();
    }

    let val: string;

    switch (statement.value.value.type) {
        default:
            val = (statement.value.value as any).value.toString();
    }

    if (discardNullOrWhitespace && val.trim() === '') return undefined;

    return val;
}

export function getStringArray(
    statement: AssignmentStatement,
): ScriptStringArray {
    if (statement.value.type !== 'AssignmentExpression') {
        throw new Error();
    }

    switch (statement.value.value.type) {
        case 'StringArrayLiteral':
            return statement.value.value.value;
        default:
            throw new Error();
    }
}

export function getInt(statement: AssignmentStatement): ScriptInt {
    if (statement.value.type !== 'AssignmentExpression') {
        throw new Error();
    }

    switch (statement.value.value.type) {
        case 'NumericLiteral':
            return Math.round(statement.value.value.value);
        case 'StringLiteral':
            const val = parseInt(statement.value.value.value);
            if (isNaN(val)) {
                throw new Error();
            } else if (!isFinite(val)) {
                throw new Error();
            }
            return val;
        default:
            throw new Error();
    }
}

export function getFloat(statement: AssignmentStatement): ScriptFloat {
    if (statement.value.type !== 'AssignmentExpression') {
        throw new Error();
    }

    switch (statement.value.value.type) {
        case 'NumericLiteral':
            return statement.value.value.value;
        case 'StringLiteral':
            const val = parseFloat(statement.value.value.value);
            if (isNaN(val)) {
                throw new Error();
            } else if (!isFinite(val)) {
                throw new Error();
            }
            return val;
        default:
            throw new Error();
    }
}

export function getFloatOrInt(statement: AssignmentStatement): number {
    if (statement.value.type !== 'AssignmentExpression') {
        throw new Error();
    }

    switch (statement.value.value.type) {
        case 'NumericLiteral':
            const raw = '' + statement.value.value.value;
            if (raw.indexOf('.') !== -1) {
                return statement.value.value.value;
            } else {
                return Math.round(statement.value.value.value);
            }
        case 'StringLiteral':
            const val = parseFloat(statement.value.value.value);
            if (isNaN(val)) {
                throw new Error();
            } else if (!isFinite(val)) {
                throw new Error();
            }

            if (statement.value.value.value.indexOf('.') !== -1) {
                return val;
            } else {
                return Math.round(val);
            }
        default:
            throw new Error();
    }
}

export function getBoolean(statement: AssignmentStatement): ScriptBoolean {
    if (statement.value.type !== 'AssignmentExpression') {
        throw new Error();
    }

    switch (statement.value.value.type) {
        case 'BooleanLiteral':
            return statement.value.value.value;
        case 'StringLiteral':
            return statement.value.value.value.toLowerCase() === 'true';
        default:
            throw new Error();
    }
}

export abstract class ScriptObject {
    readonly __id: string | undefined;
    readonly customProperties: { [name: string]: any } = {};

    protected readonly ignoreProperties: { [name: string]: boolean } = {};

    constructor(statement: ObjectStatement) {
        this.__id = statement.id.value;
        if (this.__id == null || this.__id === '') {
            throw new Error(
                `The name provided for the ScriptObject is either null or empty.`,
            );
        }

        if (statement.value.type !== 'ObjectConstructorExpression') {
            throw new Error('The value provided is not a ObjectConstructor.');
        }

        const body: Statement[] = statement.value.body;
        body.forEach((statement) => {
            switch (statement.type) {
                case 'AssignmentStatement':
                    if (
                        !this.onStatement(statement) &&
                        this.allowCustomProperties()
                    ) {
                        this.addCustomProperty(statement);
                    }
                    break;
                // case 'ImportStatement':
                // this.onImport(statement);
                // break;
                default:
                    throw new Error(statement.type);
            }
        });
    }

    allowCustomProperties() {
        return false;
    }

    addCustomProperty(statement: AssignmentStatement) {
        if (statement.value.type !== 'AssignmentExpression') {
            return;
        }

        const name = statement.id.value;
        let value: any;

        switch (statement.value.value.type) {
            case 'NullLiteral':
                value = null;
                break;
            case 'NumericLiteral':
            case 'BooleanLiteral':
            case 'NumericArrayLiteral':
            case 'StringLiteral':
            case 'StringArrayLiteral':
                value = statement.value.value.value;
        }

        console.log(
            `[${this.__id}] :: Adding custom property: ${name} = ${value}`,
        );
        this.customProperties[name] = value;
    }

    toJSON(): any {
        let o: any = {};
        const thisKeys: string[] = Object.keys(this);

        /* (Sort all keys alphanumerically) */
        thisKeys.sort((a, b) => a.localeCompare(b));

        for (const key of thisKeys) {
            if (key === 'ignoreProperties') continue;

            /* (Ignore keys that specific objects define) */
            if (this.ignoreProperties[key]) continue;

            /* (Only add custom properties if populated) */
            if (
                key === 'customProperties' &&
                Object.keys(this.customProperties!!).length === 0
            ) {
                continue;
            }

            /* (Add property to the exported JSON object) */
            o[key as string] = (this as any)[key];
        }
        return o;
    }

    onImport(statement: ImportsStatement) {}

    abstract onStatement(statement: AssignmentStatement): boolean;
}
