import { AssignmentStatement, ObjectStatement } from 'ast';
import { Fixer, ScriptFixer, ScriptFixerArray } from './Fixer';
import {
    getFloat,
    getString,
    getStringArray,
    ScriptFloat,
    ScriptObject,
    ScriptStringArray,
} from './ScriptObject';
import { FixerSkill } from './FixerSkill';

export class FixingScript extends ScriptObject {
    require: ScriptStringArray;
    fixers: ScriptFixerArray;
    globalItem: ScriptFixer;
    conditionModifier: ScriptFloat;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        let raw: string = '';
        let split: string[] = [];
        switch (property.toLowerCase()) {
            case 'require':
                this.require = getStringArray(statement);
                return true;
            case 'conditionmodifier':
                this.conditionModifier = getFloat(statement);
                return true;
            case 'globalitem':
                raw = getString(statement)!!;
                if (raw.indexOf('=') !== -1) {
                    const split = raw.split('=');
                    const item = split[0];
                    const amount = parseInt(split[1].trim());
                    this.globalItem = new Fixer(item, amount);
                } else {
                    this.globalItem = new Fixer(raw.trim(), 1);
                }
                return true;
            case 'fixer':
                raw = getString(statement)!!;
                if (raw.indexOf(';') !== -1) {
                    split = getString(statement)!!.split('=');
                    const item = split[0];
                    const amount = parseInt(split[1].trim());
                    if (this.fixers == null) this.fixers = [];
                    this.fixers.push(new Fixer(item, amount));
                } else {
                    split = raw.split(';');

                    let ssplit = split[0].split('=');
                    const item = ssplit[0].trim();
                    const amount = parseInt(ssplit[1].trim());
                    const fixer = new Fixer(item, amount);

                    for (let index = 1; index < raw.length; index++) {
                        ssplit = raw[index].split('=');
                        const skill = ssplit[0].trim();
                        const level = parseInt(ssplit[1].trim());

                        if (fixer.skills == null) fixer.skills = [];
                        fixer.skills.push(new FixerSkill(skill, level));
                    }

                    if (this.fixers == null) this.fixers = [];
                    this.fixers.push(fixer);
                }
                return true;
        }
        return false;
    }

    allowCustomProperties(): boolean {
        return true;
    }
}
