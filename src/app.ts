import * as fs from 'fs';
import { scanDir } from './ZedScriptUtils';
import { LexerOptions, tokenize } from './Lexer';
import { ZedScript } from './api/ZedScript';

const chalk = require('chalk');

function getArgs(): string[] {
    const args: string[] = [];
    if (process.argv.length === 2) {
        return args;
    }
    for (let i = 2; i < process.argv.length; i++) {
        args.push(process.argv[i]);
    }
    return args;
}

function help() {
    console.log(
        chalk.white(
            'ZedScriptParser (Version 41.78.16):\n\n' +
                '    --help                   :: Displays this menu.\n' +
                '    --format    [path] [out] :: Parses a ZedScript file and saves it as formatted ZedScript.\n' +
                '    --formatdir [path] [out] :: Parses a directory and saves it as formatted ZedScript.\n' +
                '    --lintfile  [path]       :: Lints a file with ZedScript.\n' +
                '    --parsedir  [path] [out] :: Parsed a directory of files with ZedScript.\n' +
                '    --tojson    [path] [out] :: Parses a ZedScript file and saves it as JSON.\n' +
                '    --toscript  [path] [out] :: Parses a JSON file and saves it as ZedScript.\n',
        ),
    );
}

function lintFile(path: string) {
    try {
        tokenize(path, { location: false, comments: false });
        console.log(
            chalk.green(`SUCCESS: The file '${path}' is valid ZedScript.`),
        );
    } catch (e) {
        console.error(
            chalk.red(`FAILURE: The file '${path}' is invalid ZedScript.`),
        );
        console.error((e as any).message);
    }
}

function init() {
    const args = getArgs();
    if (args.length === 0 || args[0].trim().toLowerCase() === 'help') {
        help();
        return;
    }

    const firstArg = args[0].toLowerCase().trim();

    switch (firstArg) {
        case '--lintfile': {
            if (args.length !== 2) {
                console.log('Invalid args.');
                console.log(args);
                help();
                return;
            }
            lintFile(args[1]);
            break;
        }
        case '--tojson': {
            if (args.length !== 3) {
                console.log('Invalid args.');
                console.log(args);
                help();
                return;
            }
            const zedScript = ZedScript.fromScript(args[1], {
                comments: false,
                location: false,
            });
            zedScript.write('json', args[2], { pretty: true });
            break;
        }
        case '--toscript': {
            if (args.length !== 3) {
                console.log('Invalid args.');
                console.log(args);
                help();
                return;
            }
            const zedScript = ZedScript.fromJSON(args[1]);
            zedScript.write('txt', args[2], { pretty: true });
            break;
        }
        case '--format': {
            if (args.length !== 3) {
                console.log('Invalid args.');
                console.log(args);
                help();
                return;
            }
            const zedScript = ZedScript.fromScript(args[1], {
                comments: false,
                location: false,
            });
            zedScript.write('txt', args[2], { pretty: true });
            break;
        }
        case '--formatdir': {
            if (args.length !== 3) {
                console.log('Invalid args.');
                console.log(args);
                help();
                return;
            }

            function doFile(file: string, out: string) {
                console.log(`Formatting: ${file}`);
                const zedScript = ZedScript.fromScript(file, {
                    comments: false,
                    location: false,
                });
                zedScript.write('txt', out, { pretty: true });
            }

            const [_, path, out] = args;
            const files: string[] = [];
            scanDir(path, '.txt', files);
            files.sort((a, b) => a.localeCompare(b));
            for (const file of files) {
                doFile(file, file.replace(path, out));
            }
            break;
        }
        default: {
            console.log(`Unknown command: ${args[0]}`);
            help();
        }
    }
}

init();

// function doFolder(path: string, out: string, options: LexerOptions) {
//     const files: string[] = [];
//     scanDir(path, '.txt', files);
//     files.sort((a, b) => a.localeCompare(b));
//     for (const file of files) {
//         doFile(file, file.replace(path, out), options);
//     }
// };

// doFolder('./assets/media/scripts', './assets/media/scripts_json', {
//     comments: true,
//     location: false,
// });

// doFile(
//     './assets/media/scripts/vehicles/template_battery.txt',
//     './assets/media/scripts_json/vehicles/template_battery.txt',
//     {
//         comments: false,
//         location: false,
//     },
// );
