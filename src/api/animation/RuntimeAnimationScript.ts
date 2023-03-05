import { ParseBag } from '../../Parser';
import { Script } from '../Script';

/**
 * **RuntimeAnimationScript**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class RuntimeAnimationScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
        }
        return false;
    }
}
