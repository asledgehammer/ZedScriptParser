import {
    getInt,
    getString,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../../Script';
import { ItemScript } from './ItemScript';
import { ParseBag } from '../../parser';

export class ContainerItem extends ItemScript {
    canBeEquipped: ScriptString;
    capacity: ScriptInt;
    closeSound: ScriptString;
    onlyAcceptCategory: ScriptString;
    openSound: ScriptString;
    putInSound: ScriptString;
    soundParameter: ScriptStringArray;
    weightReduction: ScriptInt;

    constructor(bag: ParseBag) {
        super(bag, '=', 'Container');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return super.onPropertyObject(bag, property);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'canbeequipped':
                this.canBeEquipped = getString(value);
                return true;
            case 'capacity':
                this.capacity = getInt(value);
                return true;
            case 'closesound':
                this.closeSound = getString(value);
                return true;
            case 'onlyacceptcategory':
                this.onlyAcceptCategory = getString(value);
                return true;
            case 'opensound':
                this.openSound = getString(value);
                return true;
            case 'putinsound':
                this.putInSound = getString(value);
                return true;
            case 'soundparameter':
                this.soundParameter = getString(value)?.split(' ');
                return true;
            case 'weightreduction':
                this.weightReduction = getInt(value);
                return true;
        }
        return super.onPropertyValue(property, value);
    }
}
