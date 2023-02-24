export type ScriptRecipeSourceItemArray = RecipeSourceItem[] | undefined;

export class RecipeSourceItem {
    name: string;
    amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
