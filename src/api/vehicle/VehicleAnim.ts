import { getFloat, getString, Script, ScriptFloat, ScriptString, ScriptVector3 } from '../Script';
import { ParseBag } from '../../Parser';

export class VehicleAnim extends Script {
    angle: ScriptVector3;
    anim: ScriptString;
    rate: ScriptFloat;
    sound: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'angle':
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.angle = { x, y, z };
                return true;
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
