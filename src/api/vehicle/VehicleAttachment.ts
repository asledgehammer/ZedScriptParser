import { ParseBag } from '../../Parser';
import { getInt, getString, Script, ScriptInt, ScriptString, ScriptVector3 } from '../Script';

export class VehicleAttachment extends Script {
    offset: ScriptVector3;
    rotate: ScriptVector3;
    zOffset: ScriptInt;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyValue(property: string, value: string): boolean {
        property = property.trim();
        value = value.trim();
        switch (property.toLowerCase()) {
            case 'offset': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return parseFloat(o);
                    });
                this.offset = { x, y, z };
                return true;
            }
            case 'rotate': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return parseFloat(o);
                    });
                this.rotate = { x, y, z };
                return true;
            }
            case 'zoffset': {
                this.zOffset = getInt(value);
                return true;
            }
        }
        return false;
    }
}
