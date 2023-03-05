import { ParseBag } from '../../Parser';
import {
    getBoolean,
    getInt,
    getString,
    getVector3,
    Script,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
    ScriptVector3,
} from '../Script';

/**
 * **VehicleAttachment**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
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
            case 'offset':
                this.offset = getVector3(value);
                return true;
            case 'rotate':
                this.rotate = getVector3(value);
                return true;
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
