export class RecipeResult {
    amount: number;
    item: string;

    constructor(item: string, amount: number) {
        this.item = item;
        this.amount = amount;
    }
}
