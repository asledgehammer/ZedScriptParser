import { getFloat, getString, Script, ScriptFloat, ScriptString } from '../Script';
import { ParseBag } from '../../Parser';

export class VehicleSwitchSeat extends Script {
    anim: ScriptString;
    rate: ScriptFloat;
    sound: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'anim':
                this.anim = getString(value);
                return true;
            case 'rate':
                this.rate = getFloat(value);
                return true;
            case 'sound':
                this.sound = getString(value);
                return true;
        }
        return false;
    }
}
