import { Fixer, ScriptFixer, ScriptFixerArray } from './Fixer';
import {
    getFloat,
    getString,
    Script,
    ScriptFloat,
    ScriptStringArray,
} from '../Script';
import { FixerSkill } from './FixerSkill';
import { ParseBag } from '../../Parser';

export class FixingScript extends Script {
    require: ScriptStringArray;
    fixers: ScriptFixerArray;
    globalItem: ScriptFixer;
    conditionModifier: ScriptFloat;

    constructor(bag: ParseBag) {
        super(bag, ':');
    }

    onPropertyValue(property: string, value: string): boolean {
        let raw: string | null | undefined;
        let split: string[] = [];

        switch (property.toLowerCase()) {
            case 'require':
                this.require = getString(value)?.split(';');
                return true;
            case 'conditionmodifier':
                this.conditionModifier = getFloat(value);
                return true;
            case 'globalitem':
                raw = getString(value)!!;
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
                raw = getString(value);
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
}
