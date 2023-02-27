import { ParseBag } from '../../Parser';
import { ItemRecipe } from './ItemRecipe';
import {
    getBoolean,
    getInt,
    getString,
    Script,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
} from '../Script';

export type ScriptItemRecipeMap = { [name: string]: ItemRecipe } | undefined;

export class EvolvedRecipeScript extends Script {
    name: ScriptString;
    maxItems: ScriptInt;
    items: ScriptItemRecipeMap;
    resultItem: ScriptString;
    baseItem: ScriptString;
    cookable: ScriptBoolean;
    addIngredientIfCooked: ScriptBoolean;
    canAddSpicesEmpty: ScriptBoolean;
    addIngredientSound: ScriptString;
    hidden: ScriptBoolean;
    allowFrozenItem: ScriptBoolean;

    constructor(bag: ParseBag) {
        super(bag, ':');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'baseitem':
                this.baseItem = getString(value);
                break;
            case 'name':
                this.name = getString(value);
                break;
            case 'resultitem':
                this.resultItem = getString(value);
                break;
            case 'cookable':
                this.cookable = true; // Set to true regardless of flag set.
                break;
            case 'maxitems':
                this.maxItems = getInt(value);
                break;
            case 'addingredientifcooked':
                this.addIngredientIfCooked = getBoolean(value);
                break;
            case 'addingredientsound':
                this.addIngredientSound = getString(value);
                break;
            case 'canaddspicesempty':
                this.canAddSpicesEmpty = getBoolean(value);
                break;
            case 'ishidden':
                this.hidden = getBoolean(value);
                break;
            case 'allowfrozenitem':
                this.allowFrozenItem = getBoolean(value);
                break;
        }
        return false;
    }

    parse(bag: ParseBag) {
        while (!bag.isEOF()) {
            const curr = bag.next();
            if (curr === '}') return;

            const split = curr.split(':');
            const property = split[0];
            const value = split[1];
            const propLower = property.toLowerCase();

            switch (propLower) {
            }
        }
    }
}
