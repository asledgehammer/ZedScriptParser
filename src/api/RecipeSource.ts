import { RecipeSourceItem } from "./RecipeSourceItem";

export type ScriptRecipeSourceArray = RecipeSource[] | undefined;

export class RecipeSource {
    items: RecipeSourceItem[];
    action: 'keep' | 'destroy' | 'none';

    constructor(items: RecipeSourceItem[], action: 'keep' | 'destroy' | 'none') {
        this.items = items;
        this.action = action;
    }
}
