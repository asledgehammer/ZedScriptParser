import {
    getBoolean,
    getInt,
    getString,
    Script,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../Script';
import { ParseBag } from '../../Parser';
import { VehicleItems } from './VehicleItems';
import { VehicleItem } from './VehicleItem';

/**
 * **VehicleTable**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class VehicleTable extends Script {
    area: ScriptString;
    complete: ScriptString;
    door: ScriptString;
    items: VehicleItem[] | undefined;
    mechanicRequireKey: ScriptBoolean;
    professions: ScriptString;
    recipes: ScriptStringArray;
    requireEmpty: ScriptBoolean;
    requireInstalled: ScriptStringArray;
    requireUninstalled: ScriptStringArray;
    skills: ScriptString;
    test: ScriptString;
    time: ScriptInt;
    traits: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'items':
                this.items = new VehicleItems(bag).items;
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'area':
                this.area = getString(value);
                return true;
            case 'complete':
                this.complete = getString(value);
                return true;
            case 'door':
                this.door = getString(value);
                return true;
            case 'mechanicrequirekey':
                this.mechanicRequireKey = getBoolean(value);
                return true;
            case 'professions':
                this.professions = getString(value);
                return true;
            case 'recipes':
                this.recipes = getString(value)
                    .split(';')
                    .map((o) => {
                        return o.trim();
                    });
                return true;
            case 'requireempty':
                this.requireEmpty = getBoolean(value);
                return true;
            case 'requireinstalled':
                this.requireInstalled = getString(value)
                    .split(';')
                    .map((o) => {
                        return o.trim();
                    });
                return true;
            case 'requireuninstalled':
                this.requireUninstalled = getString(value)
                    .split(';')
                    .map((o) => {
                        return o.trim();
                    });
                return true;
            case 'skills':
                this.skills = getString(value);
                return true;
            case 'test':
                this.test = getString(value);
                return true;
            case 'time':
                this.time = getInt(value);
                return true;
            case 'traits':
                this.traits = getString(value);
                return true;
        }
        return false;
    }
}
