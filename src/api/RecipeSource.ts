import { RecipeAction } from 'ast';
import { ScriptRecipeSourceItemArray } from './RecipeSourceItem';

export type ScriptRecipeSourceArray = RecipeSource[] | undefined;

export class RecipeSource {
    items: ScriptRecipeSourceItemArray[];
    action: RecipeAction;

    constructor(items: ScriptRecipeSourceItemArray[], action: RecipeAction) {
        this.items = items;
        this.action = action;
    }
}
