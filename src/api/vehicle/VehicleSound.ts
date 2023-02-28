import { ParseBag } from 'Parser';
import { getURI, Script, ScriptString } from '../Script';

export class VehicleSound extends Script {

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.trim().toLowerCase()) {
        }
        return false;
    }
}
