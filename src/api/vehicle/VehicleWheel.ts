import {
    getBoolean,
    getFloat,
    getString,
    Script,
    ScriptBoolean,
    ScriptFloat,
    ScriptVector3,
} from '../Script';
import { ParseBag } from '../../Parser';

export class VehicleWheel extends Script {
    front: ScriptBoolean;
    offset: ScriptVector3;
    radius: ScriptFloat;
    width: ScriptFloat;

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
            case 'front':
                this.front = getBoolean(value);
                return true;
            case 'offset':
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return parseFloat(o.trim());
                    });
                this.offset = { x, y, z };
                return true;
            case 'radius':
                this.radius = getFloat(value);
                return true;
            case 'width':
                this.width = getFloat(value);
                return true;
        }
        return false;
    }
}
