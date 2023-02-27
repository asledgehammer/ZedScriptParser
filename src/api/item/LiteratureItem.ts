import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../../Script';
import { ItemScript } from './ItemScript';
import { ParseBag } from '../../parser';

export class LiteratureItem extends ItemScript {
    canBeWrite: ScriptBoolean;
    lvlSkillTrained: ScriptInt;
    numberOfPages: ScriptInt;
    numLevelsTrained: ScriptInt;
    pageToWrite: ScriptInt;
    skillTrained: ScriptString;
    teachedRecipes: ScriptStringArray;

    constructor(bag: ParseBag) {
        super(bag, '=', 'Literature');
    }

    onPropertyObject(_: ParseBag, __: string): boolean {
        return super.onPropertyObject(_, __);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch(property.toLowerCase()) {
            case 'canbewrite':
                this.canBeWrite = getBoolean(value);
                return true;
            case 'lvlskilltrained':
                this.lvlSkillTrained = getInt(value);
                return true;
            case 'numberofpages':
                this.numberOfPages = getInt(value);
                return true;
            case 'numlevelstrained':
                this.numLevelsTrained = getInt(value);
                return true;
            case 'pagetowrite':
                this.pageToWrite = getInt(value);
                return true;
            case 'skilltrained':
                this.skillTrained = getString(value);
                return true;
            case 'teachedrecipes':
                this.teachedRecipes = getString(value)
                    ?.split(';')
                    .map((a) => {
                        return a.trim();
                    });
                return true;

        }
        return super.onPropertyValue(property, value);
    }
}
