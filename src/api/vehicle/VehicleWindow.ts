import { getBoolean, Script, ScriptBoolean } from '../Script';
import { ParseBag } from '../../Parser';

export class VehicleWindow extends Script {
    openable: ScriptBoolean;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'openable':
                this.openable = getBoolean(value);
                return true;
        }
        return false;
    }
}
