import { ParseBag } from '../../parser';
import { ItemScript } from './ItemScript';

export class KeyRingItem extends ItemScript {
    constructor(bag: ParseBag) {
        super(bag, '=', 'KeyRing');
    }

    onPropertyObject(_: ParseBag, __: string): boolean {
        return super.onPropertyObject(_, __);
    }

    onPropertyValue(property: string, value: string): boolean {
        return super.onPropertyValue(property, value);
    }
}
