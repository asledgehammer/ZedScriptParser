import { Script } from '../Script';
import { ParseBag } from '../parser';

export class VehicleScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=');
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
