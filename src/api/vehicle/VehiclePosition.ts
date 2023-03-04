import { getFloat, getString, Script, ScriptVector3 } from '../Script';
import { ParseBag } from '../../Parser';

export class VehiclePosition extends Script {
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
