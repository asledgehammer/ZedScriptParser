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
