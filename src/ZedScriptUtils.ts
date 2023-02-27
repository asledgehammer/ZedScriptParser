import * as fs from 'fs';

export const removeComments = (t: string): string => {
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

export function tokenizeScript(text: string): string[] {
    const lines = removeSyntaxErrors(removeComments(text)).split(/\r\n/g);

    let tokens: string[] = [];

    for (let line of lines) {
        line = line.trim();

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

export const removeSyntaxErrors = (s: string) => {
    // I have no idea why PZ's parser tolerates two commas in a row..
    return s.replace(/,,/g, ',');
};

export function EOF(id: string) {
    throw new Error(`Unexpected EOF while parsing '${id}'`);
}
