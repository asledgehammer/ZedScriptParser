import { getString, ScriptString } from '../Script';
import { ItemScript } from './ItemScript';
import { ParseBag } from '../../Parser';

export class MapItem extends ItemScript {
    map: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', 'Map');
    }

    onPropertyObject(_: ParseBag, __: string): boolean {
        return super.onPropertyObject(_, __);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'map':
                this.map = getString(value);
                return true;
        }
        return super.onPropertyValue(property, value);
    }
}
