import { AssignmentStatement } from 'ast';
import { ItemRecipe } from './ItemRecipe';
import { ScriptObject } from './ScriptObject';

export class EvolvedRecipeScript extends ScriptObject {
    displayName: string | undefined;
    originalName: string | undefined;
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

    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'baseitem':
                this.baseItem = this.getStringValue(statement);
                break;
            case 'name':
                this.originalName = this.displayName;
                break;
            case 'resultitem':
                this.resultItem = this.getStringValue(statement);
                break;
            case 'cookable':
                this.cookable = true; // Set to true regardless of flag set.
                break;
            case 'maxitems':
                this.maxItems = this.getIntValue(statement);
                break;
            case 'addingredientifcooked':
                this.addIngredientIfCooked = this.getBooleanValue(statement);
                break;
            case 'addingredientsound':
                this.addIngredientSound = this.getStringValue(statement, true);
                break;
            case 'canaddspicesempty':
                this.canAddSpicesEmpty = this.getBooleanValue(statement);
                break;
            case 'ishidden':
                this.hidden = this.getBooleanValue(statement);
                break;
            case 'allowfrozenitem':
                this.allowFrozenItem = this.getBooleanValue(statement);
                break;
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
        }
    }
}
