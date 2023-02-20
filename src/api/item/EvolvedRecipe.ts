export type ScriptEvolvedRecipe = EvolvedRecipe | undefined;
export type ScriptEvolvedRecipeArray = EvolvedRecipe[] | undefined;

export class EvolvedRecipe {
    name: string;
    amount: number;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }
}
