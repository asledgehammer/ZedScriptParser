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

export function parse(tokens: string[]): ModuleScript[] {
    const bag = new ParseBag(tokens);

    const modules: { [name: string]: ModuleScript } = {};

    while (!bag.isEOF()) {
        const curr = bag.next();
        if (curr === 'module') {
            const module = new ModuleScript(bag);
            modules[module.__name] = module;
        }
    }

    const array: ModuleScript[] = [];
    const keys = Object.keys(modules);
    keys.sort((a, b) => a.localeCompare(b));
    for (const key of keys) {
        array.push(modules[key]);
    }

    return array;
}
