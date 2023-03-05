/**
 * **RecipeResult**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class RecipeResult {
    amount: number;
    item: string;

    constructor(item: string, amount: number) {
        this.item = item;
        this.amount = amount;
    }
}
