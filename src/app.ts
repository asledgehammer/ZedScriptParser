import * as fs from 'fs';
import { scanDir } from './ZedScriptUtils';
import { LexerOptions, tokenize } from './Lexer';
import { parse } from './Parser';

function getParentFolder(path: string): string {
    const a = path.replace(/\\/g, '/').split('/');
    a.pop();
    return a.join('/');
}

const doFile = (path: string, out: string, options: LexerOptions) => {
    console.log(`[ZedScriptParse] :: Parsing '${path}'`);

    const folder = getParentFolder(out);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    /* Tokens. */
    const tokens = tokenize(path, options);
    fs.writeFileSync(
        out.replace('.txt', '.tokens.json'),
        JSON.stringify({ tokens: tokens.tokens }, null, 4),
    );

    /* Parsed API */
    const parsed = parse(tokens.tokens as string[]);
    fs.writeFileSync(
        out.replace('.txt', '.json'),
        JSON.stringify({ modules: parsed }, null, 4),
    );
};

const doFolder = (path: string, out: string, options: LexerOptions) => {
    const files: string[] = [];
    scanDir(path, '.txt', files);
    files.sort((a, b) => a.localeCompare(b));
    for (const file of files) {
        doFile(file, file.replace(path, out), options);
    }
};

doFolder('./assets/media/scripts', './assets/media/scripts_json', {
    comments: false,
    location: false,
});
