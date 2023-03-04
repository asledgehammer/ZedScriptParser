import { ParseBag } from 'Parser';
import { getURI, Script, ScriptString } from '../Script';

export class VehiclePhysics extends Script {

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.trim().toLowerCase()) {
        }
        return false;
    }
}
