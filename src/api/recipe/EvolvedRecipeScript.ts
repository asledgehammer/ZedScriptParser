import { ParseBag, ParseError } from '../../Parser';
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

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'addingredientifcooked':
                this.addIngredientIfCooked = getBoolean(value);
                return true;
            case 'addingredientsound':
                this.addIngredientSound = getString(value);
                return true;
            case 'allowfrozenitem':
                this.allowFrozenItem = getBoolean(value);
                return true;
            case 'baseitem':
                this.baseItem = getString(value);
                return true;
            case 'canaddspicesempty':
                this.canAddSpicesEmpty = getBoolean(value);
                return true;
            case 'cookable':
                this.cookable = true; // Set to true regardless of flag set.
                return true;
            case 'ishidden':
                this.hidden = getBoolean(value);
                return true;
            case 'maxitems':
                this.maxItems = getInt(value);
                return true;
            case 'name':
                this.name = getString(value);
                return true;
            case 'resultitem':
                this.resultItem = getString(value);
                return true;
        }
        return false;
    }
}