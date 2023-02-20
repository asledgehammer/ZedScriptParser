import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemRecipe } from './ItemRecipe';
import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptInt,
    ScriptObject,
    ScriptString,
} from './ScriptObject';

export type ScriptItemRecipeMap = { [name: string]: ItemRecipe } | undefined;

export class EvolvedRecipeScript extends ScriptObject {
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

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'baseitem':
                this.baseItem = getString(statement);
                return true;
            case 'name':
                this.name = getString(statement);
                return true;
            case 'resultitem':
                this.resultItem = getString(statement);
                return true;
            case 'cookable':
                this.cookable = true; // Set to true regardless of flag set.
                return true;
            case 'maxitems':
                this.maxItems = getInt(statement);
                return true;
            case 'addingredientifcooked':
                this.addIngredientIfCooked = getBoolean(statement);
                return true;
            case 'addingredientsound':
                this.addIngredientSound = getString(statement, true);
                return true;
            case 'canaddspicesempty':
                this.canAddSpicesEmpty = getBoolean(statement);
                return true;
            case 'ishidden':
                this.hidden = getBoolean(statement);
                return true;
            case 'allowfrozenitem':
                this.allowFrozenItem = getBoolean(statement);
                return true;
        }
        return false;
    }

    allowCustomProperties(): boolean {
        return true;
    }
}
