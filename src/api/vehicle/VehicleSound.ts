import { ParseBag } from 'Parser';
import { getString, Script, ScriptString } from '../Script';

export class VehicleSound extends Script {
    backSignal: ScriptString;
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
            case 'backsignal':
                this.backSignal = getString(value);
                return true;
            case 'engine':
                this.engine = getString(value);
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
