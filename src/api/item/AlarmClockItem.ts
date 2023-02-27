import { ParseBag } from '../../Parser';
import { ItemScript } from './ItemScript';

export class AlarmClockItem extends ItemScript {
    constructor(bag: ParseBag) {
        super(bag, '=', 'AlarmClock');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return super.onPropertyObject(bag, property);
    }

    onPropertyValue(property: string, value: string): boolean {
        return super.onPropertyValue(property, value);
    }
}
