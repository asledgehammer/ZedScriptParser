import {
    getFloat,
    getInt,
    getString,
    ScriptFloat,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

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

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'aimingtimemodifier':
                this.aimingTimeModifier = getInt(statement);
                return true;
            case 'anglemodifier':
                this.angleModifier = getFloat(statement);
                return true;
            case 'damagemodifier':
                this.damageModifier = getFloat(statement);
                return true;
            case 'hitchancemodifier':
                this.hitChanceModifier = getInt(statement);
                return true;
            case 'maxrangemodifier':
                this.maxRangeModifier = getInt(statement);
                return true;
            case 'minrangemodifier':
                this.minRangeModifier = getInt(statement);
                return true;
            case 'mounton':
                this.mountOn = getString(statement)
                    ?.split(';')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
            case 'parttype':
                this.partType = getString(statement);
                return true;
            case 'recoildelaymodifier':
                this.recoilDelayModifier = getInt(statement);
                return true;
            case 'reloadtimemodifier':
                this.reloadTimeModifier = getInt(statement);
                return true;
            case 'weightmodifier':
                this.weightModifier = getFloat(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'WeaponPart';
    }
}
