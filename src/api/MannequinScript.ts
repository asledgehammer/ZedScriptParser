import { ParseBag } from 'parser';
import {
    getBoolean,
    getString,
    Script,
    ScriptBoolean,
    ScriptString,
} from '../Script';

export class MannequinScript extends Script {
    animSet: ScriptString;
    animState: ScriptString;
    female: ScriptBoolean;
    model: ScriptString;
    outfit: ScriptString;
    pose: ScriptString;
    texture: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'animset':
                this.animSet = getString(value);
                return true;
            case 'animstate':
                this.animState = getString(value);
                return true;
            case 'female':
                this.female = getBoolean(value);
                return true;
            case 'model':
                this.model = getString(value);
                return true;
            case 'outfit':
                this.outfit = getString(value);
                return true;
            case 'pose':
                this.pose = getString(value);
                return true;
            case 'texture':
                this.texture = getString(value);
                return true;
        }
        return false;
    }
}
