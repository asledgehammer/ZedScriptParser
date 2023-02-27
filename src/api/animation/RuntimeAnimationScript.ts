import { ParseBag } from '../../Parser';
import { Script } from '../Script';

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
