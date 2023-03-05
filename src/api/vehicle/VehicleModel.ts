import { ParseBag } from '../../Parser';
import {
    getFloat,
    getURI,
    getVector3,
    Script,
    ScriptFloat,
    ScriptString,
    ScriptVector3,
} from '../Script';

/**
 * **VehicleModel**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class VehicleModel extends Script {
    file: ScriptString;
    offset: ScriptVector3;
    rotate: ScriptVector3;
    scale: ScriptFloat;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'file':
                this.file = getURI(value);
                return true;
            case 'scale':
                this.scale = getFloat(value);
                return true;
            case 'offset':
                this.offset = getVector3(value);
                return true;
            case 'rotate':
                this.rotate = getVector3(value);
                return true;
        }
        return false;
    }
}
