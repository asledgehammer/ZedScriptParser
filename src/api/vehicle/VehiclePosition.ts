import {
    getFloat,
    getString,
    Script,
    ScriptString,
    ScriptVector3,
} from '../Script';
import { ParseBag } from '../../Parser';

/**
 * **VehiclePosition**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class VehiclePosition extends Script {
    area: ScriptString;
    offset: ScriptVector3;
    rotate: ScriptVector3;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'area':
                this.area = getString(value);
                return true;
            case 'offset': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.offset = { x, y, z };
                return true;
            }
            case 'rotate': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.offset = { x, y, z };
                return true;
            }
        }
        return false;
    }
}
