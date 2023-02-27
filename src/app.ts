/** NOTE: Do not consider this to be final, acceptable code. This is the initial code to get a working AST export. */

import * as fs from 'fs';
import { scanDir } from './utils';
import { LexerOptions, tokenize } from './lexer';
import { parse } from './parser';

const doFile = (path: string, options: LexerOptions) => {
    console.log(`[ZedScriptParse] :: Parsing '${path}'`);
    const tokens = tokenize(path, options);
    const parsed = parse(tokens.tokens as string[]);
    fs.writeFileSync(
        path.replace('.txt', '.json'),
        JSON.stringify({modules: parsed}, null, 4),
    );
};

const doFolder = (path: string, options: LexerOptions) => {
    const files: string[] = [];
    scanDir(path, '.txt', files);
    files.sort((a, b) => a.localeCompare(b));
    for (const file of files) {
        doFile(file, options);
    }
};

doFolder('./assets/media/scripts', { comments: false, location: false });
