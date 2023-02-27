import { ParseBag } from '../../Parser';
import { ItemScript } from './ItemScript';

export class MoveableItem extends ItemScript {
    constructor(bag: ParseBag) {
        super(bag, '=', 'Moveable');
    }

    onPropertyToken(_: ParseBag, __: string): boolean {
        return super.onPropertyToken(_, __);
    }

    onPropertyValue(property: string, value: string): boolean {
        return super.onPropertyValue(property, value);
    }
}
