import { ParseBag } from '../../Parser';
import { ItemScript } from './ItemScript';

console.log(ItemScript);

export class ComboItem extends ItemScript {
    constructor(bag: ParseBag) {
        super(bag, '=', 'Normal');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return super.onPropertyObject(bag, property);
    }

    onPropertyValue(property: string, value: string): boolean {
        return super.onPropertyValue(property, value);
    }
}
