import * as fs from 'fs';

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
