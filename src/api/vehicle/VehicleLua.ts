import { getString, Script, ScriptString } from '../Script';
import { ParseBag } from '../../Parser';

export class VehicleLua extends Script {
    create: ScriptString;
    update: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'create':
                this.create = getString(value);
                return true;
            case 'update':
                this.update = getString(value);
                return true;
        }
        return false;
    }
}
