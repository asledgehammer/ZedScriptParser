import { ParseBag } from 'Parser';
import { getString, getURI, Script, ScriptString } from '../Script';

export class VehicleSound extends Script {
    engine: ScriptString;
    engineStart: ScriptString;
    engineTurnOff: ScriptString;
    horn: ScriptString;
    ignitionFail: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.trim().toLowerCase()) {
            case 'engine':
                return true;
            case 'enginestart':
                this.engineStart = getString(value);
                return true;
            case 'engineturnoff':
                this.engineTurnOff = getString(value);
                return true;
            case 'horn':
                this.horn = getString(value);
                return true;
            case 'ignitionfail':
                this.ignitionFail = getString(value);
                return true;
        }
        return false;
    }
}
