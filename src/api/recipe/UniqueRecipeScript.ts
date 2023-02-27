import { ParseBag } from 'Parser';
import { Script } from 'api/Script';

export class UniqueRecipeScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, ':');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
        }
        return false;
    }
}
