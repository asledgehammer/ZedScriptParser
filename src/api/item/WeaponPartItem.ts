import {
    getFloat,
    getInt,
    getString,
    ScriptFloat,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../Script';
import { ItemScript } from './ItemScript';
import { ParseBag } from '../../Parser';

/**
 * **WeaponPartItem**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class WeaponPartItem extends ItemScript {
    aimingTimeModifier: ScriptInt;
    angleModifier: ScriptFloat;
    damageModifier: ScriptFloat;
    hitChanceModifier: ScriptInt;
    maxRangeModifier: ScriptInt;
    minRangeModifier: ScriptInt;
    mountOn: ScriptStringArray;
    partType: ScriptString;
    recoilDelayModifier: ScriptInt;
    reloadTimeModifier: ScriptInt;
    weightModifier: ScriptFloat;

    constructor(bag: ParseBag) {
        super(bag, '=', 'WeaponPart');
    }

    onPropertyToken(_: ParseBag, __: string): boolean {
        return super.onPropertyToken(_, __);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'aimingtimemodifier':
                this.aimingTimeModifier = getInt(value);
                return true;
            case 'anglemodifier':
                this.angleModifier = getFloat(value);
                return true;
            case 'damagemodifier':
                this.damageModifier = getFloat(value);
                return true;
            case 'hitchancemodifier':
                this.hitChanceModifier = getInt(value);
                return true;
            case 'maxrangemodifier':
                this.maxRangeModifier = getInt(value);
                return true;
            case 'minrangemodifier':
                this.minRangeModifier = getInt(value);
                return true;
            case 'mounton':
                this.mountOn = getString(value)
                    ?.split(';')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
            case 'parttype':
                this.partType = getString(value);
                return true;
            case 'recoildelaymodifier':
                this.recoilDelayModifier = getInt(value);
                return true;
            case 'reloadtimemodifier':
                this.reloadTimeModifier = getInt(value);
                return true;
            case 'weightmodifier':
                this.weightModifier = getFloat(value);
                return true;
        }
        return super.onPropertyValue(property, value);
    }
}
