import { ParseBag, ParseError } from '../Parser';
import { EvolvedRecipeScript } from './recipe/EvolvedRecipeScript';

export type ScriptBoolean = boolean | undefined;
export type ScriptFloat = number | undefined;
export type ScriptInt = number | undefined;
export type ScriptString = string | null | undefined;
export type ScriptIntArray = number[] | undefined;
export type ScriptFloatArray = number[] | undefined;
export type ScriptStringArray = string[] | undefined;

export function getString(value: string): string {
    return value;
}

export function getInt(value: string): ScriptInt {
    const val = parseInt(value);
    if (isNaN(val)) throw new Error();
    else if (!isFinite(val)) throw new Error();
    return val;
}

export function getFloat(value: string): ScriptFloat {
    const val = parseFloat(value);
    if (isNaN(val)) throw new Error();
    else if (!isFinite(val)) throw new Error();
    return val;
}

export function getBoolean(value: string): ScriptBoolean {
    return value.toLowerCase() === 'true';
}

export abstract class Script {
    __properties: { [name: string]: string } | undefined;
    protected readonly ignoreProperties: { [name: string]: boolean } = {};

    readonly __name: string | undefined;
    readonly __operator: '=' | ':';

    constructor(
        bag: ParseBag,
        operator: '=' | ':',
        parseImmediately: boolean = true,
        noName: boolean = false,
    ) {
        if (!noName) this.__name = bag.next();
        this.__operator = operator;
        this.ignoreProperties['__operator'] = true;

        if (this.__name !== undefined && this.__name === '') {
            throw new Error(`Name is empty.`);
        }

        if (bag.next() !== '{') {
            throw new ParseError(`Expected '{'`);
        }

        if (parseImmediately) this.parse(bag);
    }

    parse(bag: ParseBag) {
        while (!bag.isEOF()) {
            const curr = bag.peek();
            if (curr === '}') {
                bag.next();
                return;
            }
            this.onParse(bag);
        }
    }

    onParse(bag: ParseBag): void {
        const curr = bag.next();
        if (curr.indexOf(this.__operator) !== -1) {
            const [property, value] = curr.split(this.__operator);
            if (!this.onPropertyValue(property, value)) {
                this.addCustomProperty(property, value);
            }
        } else {
            if (!this.onPropertyObject(bag, curr)) {
                throw new ParseError(`Unknown property object: ${curr}`);
            }
        }
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
            if (key === '__properties') {
                const propKeys = Object.keys(this.__properties!!);
                if (propKeys.length === 0) continue;
                o.__properties = {};
                propKeys.sort((a, b) => a.localeCompare(b));
                for (const key of propKeys) {
                    o.__properties[key] = this.__properties!![key];
                }
            }

            /* (Add property to the exported JSON object) */
            o[key as string] = (this as any)[key];
        }
        return o;
    }

    addCustomProperty(property: string, value: string): void {
        if (this.__properties == undefined) {
            this.__properties = {};
        }
        this.__properties[property] = value;
    }

    hasCustomProperty(property: string): boolean {
        return (
            this.__properties != undefined &&
            this.__properties[property] != undefined
        );
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        return false;
    }
}