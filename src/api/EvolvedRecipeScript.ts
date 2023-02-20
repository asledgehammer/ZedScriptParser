import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemRecipe } from './ItemRecipe';
import { getBoolean, getInt, getString, ScriptObject, ScriptString } from './ScriptObject';

export class EvolvedRecipeScript extends ScriptObject {
    _name: ScriptString;
    maxItems: number | undefined;
    items: { [name: string]: ItemRecipe } | undefined;
    resultItem: string | undefined;
    baseItem: string | undefined;
    cookable: boolean | undefined;
    addIngredientIfCooked: boolean | undefined;
    canAddSpicesEmpty: boolean | undefined;
    addIngredientSound: string | undefined;
    hidden: boolean | undefined;
    allowFrozenItem: boolean | undefined;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'baseitem':
                this.baseItem = getString(statement);
                break;
            case 'name':
                this._name = getString(statement);
                break;
            case 'resultitem':
                this.resultItem = getString(statement);
                break;
            case 'cookable':
                this.cookable = true; // Set to true regardless of flag set.
                break;
            case 'maxitems':
                this.maxItems = getInt(statement);
                break;
            case 'addingredientifcooked':
                this.addIngredientIfCooked = getBoolean(statement);
                break;
            case 'addingredientsound':
                this.addIngredientSound = getString(statement, true);
                break;
            case 'canaddspicesempty':
                this.canAddSpicesEmpty = getBoolean(statement);
                break;
            case 'ishidden':
                this.hidden = getBoolean(statement);
                break;
            case 'allowfrozenitem':
                this.allowFrozenItem = getBoolean(statement);
                break;
            default:
                console.warn(`[${this.__id}] :: Unknown property: ${property}`);
        }
    }
}
