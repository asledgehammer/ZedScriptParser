/** NOTE: Do not consider this to be final, acceptable code. This is the initial code to get a working AST export. */

import { parse } from './ObjectParser';
import * as fs from 'fs';
import { categories, parseAST } from './ASTParser';
import { scanDir } from './utils';
import { tokenize } from './lexer';

// const doFolder = (path: string, debug: boolean = false) => {
//     const files: string[] = [];
//     scanDir(path, '.txt', files);
//     files.sort((a, b) => a.localeCompare(b));
//     for (const file of files) {
//         doFile(file, debug);
//     }
//     console.log({categories})
// };

// const doFile = (path: string, debug: boolean = false) => {
//     console.log(`[ZedScriptParse] :: Parsing '${path}'`);
//     const ast = parseAST(fs.readFileSync(path).toString(), debug);
//     fs.writeFileSync(
//         path.replace('.txt', '.ast.json'),
//         JSON.stringify(ast, null, 4),
//     );
// };

// doFolder('./assets/media/scripts');


// const recipes = parseAST(fs.readFileSync('./assets/media/scripts/recipes.txt').toString(), true);
// fs.writeFileSync('recipes.ast.json', JSON.stringify(recipes, null, 4));

// const modules = parse('./assets/media/scripts');
// let json: any = {modules: {}};
// const moduleKeys = Object.keys(modules);
// moduleKeys.sort((a, b) => a.localeCompare(b));
// for (const key of moduleKeys) {
//     json.modules[key] = modules[key].toJSON();
// }
// fs.writeFileSync('test.json', JSON.stringify(json, null, 4));


const tokens = tokenize('./assets/media/scripts/sounds_zombie.txt', {location: true});

fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 4));