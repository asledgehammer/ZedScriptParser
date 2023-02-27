import { getInt, getString, ScriptInt, ScriptString } from '../Script';
import { ClothingItem } from './ClothingItem';
import { ParseBag } from '../../Parser';

export class AlarmClockClothingItem extends ClothingItem {
    alarmSound: ScriptString;
    soundRadius: ScriptInt;

    constructor(bag: ParseBag) {
        super(bag, 'AlarmClockClothing');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return super.onPropertyObject(bag, property);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'alarmsound':
                this.alarmSound = getString(value);
                return true;
            case 'soundradius':
                this.soundRadius = getInt(value);
                return true;
        }
        return super.onPropertyValue(property, value);
    }
}
