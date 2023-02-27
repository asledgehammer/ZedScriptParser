import { RecipeAction } from "./RecipeAction";
import { RecipeSourceItem } from "./RecipeSourceItem";

export type ScriptRecipeSourceArray = RecipeSource[] | undefined;

export class RecipeSource {
    items: RecipeSourceItem[];
    action: RecipeAction;

    constructor(items: RecipeSourceItem[], action: RecipeAction) {
        this.items = items;
        this.action = action;
    }
}
