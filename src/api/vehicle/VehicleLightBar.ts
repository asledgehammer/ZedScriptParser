import {
    getFloat,
    getString,
    Script,
    ScriptFloatArray,
    ScriptString,
} from '../Script';
import { ParseBag } from '../../Parser';

/**
 * **VehicleLightBar**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class VehicleLightBar extends Script {
    leftCol: ScriptFloatArray;
    rightCol: ScriptFloatArray;
    soundSiren: ScriptString;
    texture: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'leftcol':
                this.leftCol = getString(value)
                    .split(';')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                return true;
            case 'rightcol':
                this.leftCol = getString(value)
                    .split(';')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                return true;
            case 'soundsiren':
                this.soundSiren = getString(value);
                return true;
            case 'texture':
                this.texture = getString(value);
                return true;
        }
        return false;
    }
}
