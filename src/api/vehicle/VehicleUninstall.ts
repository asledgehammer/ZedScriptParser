import {
    getInt,
    getString,
    Script,
    ScriptInt,
    ScriptStringArray,
} from '../Script';
import { ParseBag } from '../../Parser';
import { VehicleSkill } from './VehicleSkill';

/**
 * **VehicleUninstall**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class VehicleUninstall extends Script {
    recipes: ScriptStringArray;
    skills: VehicleSkill[] | undefined;
    time: ScriptInt;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'recipes':
                this.recipes = getString(value)
                    .split(';')
                    .map((o) => {
                        return o.trim();
                    });
                return true;
            case 'skills':
                if (this.skills == null) this.skills = [];
                const split = value.split(';');
                for (const entry of split) {
                    let skill = '';
                    let level = 1;
                    if (entry.indexOf('=') !== -1) {
                        const ssplit = entry.split('=');
                        skill = ssplit[0].trim();
                        level = getInt(ssplit[1]);
                    } else {
                        skill = entry.trim();
                    }
                    this.skills.push(new VehicleSkill(skill, level));
                }
                return true;
            case 'time':
                this.time = getInt(value);
                return true;
        }
        return false;
    }
}
