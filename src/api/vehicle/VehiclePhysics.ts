import { ParseBag } from 'Parser';
import { getFloat, getString, getURI, Script, ScriptFloat, ScriptString, ScriptVector3 } from '../Script';

export class VehiclePhysics extends Script {

    extents: ScriptVector3;
    offset: ScriptVector3;
    radius: ScriptFloat;
    rotate: ScriptVector3;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.trim().toLowerCase()) {
            case 'extents': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.extents = { x, y, z };
                return true;
            }
            case 'offset': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.offset = { x, y, z };
                return true;
            }
            case 'radius':
                this.radius = getFloat(value);
                return true;
            case 'rotate': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.rotate = { x, y, z };
                return true;
            }
        }
        return false;
    }
}
