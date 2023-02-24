import * as fs from 'fs';

export type LexerCursor = { row: number; column: number };
export type LexerToken = {
    loc: { start: LexerCursor; stop: LexerCursor };
    value: string;
};

export type LexerOptions = {
    location: boolean;
}

export const tokenize = (
    path: string,
    options: Partial<LexerOptions> = {location: false}
): { tokens: LexerToken[] | string[]; comments: LexerToken[] | string[]} => {
    const raw = fs.readFileSync(path).toString().replace(/\r/g, '');
    let offset = 0;
    const cursor = { row: 1, column: 1 };
    const tokens: LexerToken[] = [];
    const comments: LexerToken[] = [];

    function nextComment() {
        const start = { row: cursor.row, column: cursor.column };
        let value = '';
        let layersIn = 1;
        while (layersIn > 0) {
            if (raw[offset] === '/' && raw[offset + 1] === '*') {
                layersIn++;
                offset += 2;
                cursor.column += 2;
            } else if (raw[offset] === '*' && raw[offset + 1] === '/') {
                layersIn--;
                offset += 2;
                cursor.column += 2;
            } else {
                if (raw[offset] === '\n') {
                    cursor.row++;
                    cursor.column = 1;
                } else cursor.column++;
                value += raw[offset++];
            }
        }
        const stop = { row: cursor.row, column: cursor.column };
        return { loc: { start, stop }, value: `/*${value}*/` };
    }

    function next(): LexerToken {
        const start = { row: -1, column: -1 };
        const stop = { row: -1, column: -1 };
        let value = '';
        while (true) {
            const cCurr = raw[offset++];
            if (cCurr === '\n') {
                stop.column = cursor.column;
                stop.row = cursor.row;
                cursor.row++;
                cursor.column = 1;
                break;
            } else if (cCurr === ' ') {
                cursor.column++;
                if (value === '') continue;
                else {
                    stop.column = cursor.column - 1;
                    stop.row = cursor.row;
                    break;
                }
            } else if (cCurr === '\t') {
                cursor.column++;
                continue;
            } else if (cCurr === '/' && raw[offset] === '*') {
                offset++;
                comments.push(nextComment());
                continue;
            }
            if (start.column === -1) {
                start.column = cursor.column;
                start.row = cursor.row;
            }
            cursor.column++;
            value += cCurr;
        }
        return { loc: { start, stop }, value };
    }
    let token;
    while (true) {
        if (offset >= raw.length) break;
        token = next();
        if (token.value === '') continue;
        if (token.value == null) break;
        tokens.push(token);
    }

    if(options.location) {
        return { tokens, comments };
    } else {
        return { tokens: tokens.map((o) => {return o.value;}),
        comments: comments.map((o) => {return o.value;})};
    }
};
