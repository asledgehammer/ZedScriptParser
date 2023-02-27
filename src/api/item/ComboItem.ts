import { ParseBag } from '../../Parser';
import { ItemScript } from './ItemScript';

console.log(ItemScript);

export class ComboItem extends ItemScript {
    constructor(bag: ParseBag) {
        super(bag, '=', 'Normal');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return super.onPropertyToken(bag, property);
    }

    onPropertyValue(property: string, value: string): boolean {
        return super.onPropertyValue(property, value);
    }
}
