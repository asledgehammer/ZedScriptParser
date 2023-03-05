import { SandBoxScript } from './api/sandbox/SandBoxOption';
import { ModuleScript } from './api/Module';

export class ParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ParseError';
    }
}

export class ParseBag {
    tokens: string[];
    offset: number = 0;

    constructor(tokens: string[]) {
        this.tokens = tokens;
    }

    next(): string {
        return this.tokens[this.offset++];
    }

    peek(offsetArg: number = 0): string {
        return this.tokens[this.offset + offsetArg];
    }

    isEOF(): boolean {
        return this.offset >= this.tokens.length;
    }
}

export function parse(tokens: string[]): {
    modules?: ModuleScript[];
    options?: SandBoxScript[];
    version?: string;
} {
    const bag = new ParseBag(tokens);

    const o: any = {};

    while (!bag.isEOF()) {
        const curr = bag.next();
        if (curr === 'module') {
            if (o.modules === undefined) o.modules = [];
            o.modules.push(new ModuleScript(bag));
        } else if (curr === 'version') {
            bag.next();
            o.version = bag.next();
        } else if (curr === 'option') {
            if (o.options === undefined) o.options = [];
            o.options.push(new SandBoxScript(bag));
        }
    }

    if (o.modules && o.options) {
        throw new ParseError(
            `'module' cannot be in the same file as 'option'.`,
        );
    }

    if (!o.version && o.options) {
        throw new ParseError(
            `'version' is not defined in the same file where 'option' is used.`,
        );
    }

    return o;
}
