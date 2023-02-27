import { ParseBag } from '../../Parser';
import { Script } from '../Script';

export class VehicleEngineScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, ':');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
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
