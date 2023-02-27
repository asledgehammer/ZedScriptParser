import { ParseBag } from 'Parser';
import { getURI, Script, ScriptString } from '../Script';

export class VehicleSkin extends Script {
    texture: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.trim().toLowerCase()) {
            case 'texture':
                this.texture = getURI(value).trim();
                return true;
        }
        return false;
    }
}
