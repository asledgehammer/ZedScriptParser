import { ParseBag } from '../parser';
import { Script } from '../Script';

export class RuntimeAnimationScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
        }
        return false;
    }
}
