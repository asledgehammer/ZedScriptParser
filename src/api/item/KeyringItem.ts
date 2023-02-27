import { ParseBag } from '../../Parser';
import { ItemScript } from './ItemScript';

export class KeyRingItem extends ItemScript {
    constructor(bag: ParseBag) {
        super(bag, '=', 'KeyRing');
    }

    onPropertyToken(_: ParseBag, __: string): boolean {
        return super.onPropertyToken(_, __);
    }

    onPropertyValue(property: string, value: string): boolean {
        return super.onPropertyValue(property, value);
    }
}
