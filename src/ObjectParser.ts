import * as fs from 'fs';
import { parseAST } from "./ASTParser";
import { scanDir } from "./utils";
import { ScriptModule } from "./api/ScriptModule";

const doFile = (modules: {[name: string]: ScriptModule}, path: string, debug: boolean = false) => {
    // console.log(`[ZedScriptParse] :: Parsing '${path}'`);
    const ast = parseAST(fs.readFileSync(path).toString(), debug);

    for(const entry of ast.body) {
        if(entry.type === 'AssignmentStatement' && entry.value.type === 'ModuleConstructorExpression') {
            const name = entry.id.value;
            const module = modules[name] != null ? modules[name] : new ScriptModule(name);
            modules[name] = module;
            module.parse(entry);

        }
    }



    // fs.writeFileSync(
    //     path.replace('.txt', '.ast.json'),
    //     JSON.stringify(ast, null, 4),
    // );
};

export function parse(path: string): {[name: string]: ScriptModule} {
    const modules: {[name: string]: ScriptModule} = {};

    const files: string[] = [];
    scanDir(path, '.txt', files);
    files.sort((a, b) => a.localeCompare(b));

    for (const file of files) {
        doFile(modules, file);
    }
    
    return modules;
}