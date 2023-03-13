import { ParseBag } from '../util/ParseBag';
import { Script } from '../Script';

/**
 * **UniqueRecipeScript**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class UniqueRecipeScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, ':');
    }

    get label(): string {
        return 'uniquerecipe';
    }
}
