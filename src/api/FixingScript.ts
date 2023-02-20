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
        let raw: string | null | undefined;
        let split: string[] = [];
        switch (property.toLowerCase()) {
            case 'require':
                this.require = getString(statement)?.split(';');
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
                if (this.fixers == null) this.fixers = [];
                raw = getString(statement);
                if (raw == null) return true;

                if (raw.indexOf(';') !== -1) {
                    split = raw.split(';');

                    for (const entry of split) {
                        if (entry.indexOf('=') !== -1) {
                            const split = entry.split('=');
                            const item = split[0].trim();
                            const amount = parseInt(split[1].trim());
                            this.fixers.push(new Fixer(item, amount));
                        } else {
                            this.fixers.push(new Fixer(entry.trim(), 1));
                        }
                    }

                } else {
                    split = raw.split(';');

                    let item = '';
                    let amount: number = 1;

                    if (raw.indexOf('=') !== -1) {
                        let ssplit = split[0].split('=');
                        item = ssplit[0].trim();
                        amount = parseInt(ssplit[1].trim());
                    } else {
                        item = raw;
                    }

                    const fixer = new Fixer(item, amount);

                    for (let index = 1; index < split.length; index++) {
                        const ssplit = split[index].split('=');

                        const skill = ssplit[0].trim();
                        const level = parseInt(ssplit[1].trim());

                        if (fixer.skills == null) fixer.skills = [];
                        fixer.skills.push(new FixerSkill(skill, level));
                    }

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
