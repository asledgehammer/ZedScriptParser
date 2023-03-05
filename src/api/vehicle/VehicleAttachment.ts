import { ParseBag } from '../../Parser';
import { getBoolean, getFloat, getInt, getString, Script, ScriptBoolean, ScriptInt, ScriptString, ScriptVector3 } from '../Script';

export class VehicleAttachment extends Script {
    canAttach: ScriptString;
    offset: ScriptVector3;
    rotate: ScriptVector3;
    updateConstraint: ScriptBoolean;
    zOffset: ScriptInt;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyValue(property: string, value: string): boolean {
        property = property.trim();
        value = value.trim();
        switch (property.toLowerCase()) {
            case 'canattach':
                this.canAttach = getString(value);
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
                this.rotate = { x, y, z };
                return true;
            }
            case 'updateconstraint':
                this.updateConstraint = getBoolean(value);
                return true;
            case 'zoffset': {
                this.zOffset = getInt(value);
                return true;
            }
        }
        return false;
    }
}
