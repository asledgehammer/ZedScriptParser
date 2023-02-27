import { ParseBag } from '../../Parser';
import { XPReward } from './BuildXP';
import { RequiredSkill } from './RequiredSkill';
import {
    getBoolean,
    getInt,
    getString,
    Script,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../Script';
import { RequiredItem } from './RequiredItem';

export class MultiStageBuildScript extends Script {
    bonusHealth: ScriptInt;
    bonusSkill: ScriptBoolean;
    canBarricade: ScriptBoolean;
    canBePlastered: ScriptBoolean;
    completionSound: ScriptString;
    craftingSound: ScriptString;
    id: ScriptString;
    name: ScriptString;
    northSprite: ScriptString;
    previousStages: ScriptStringArray;
    skillRequired: RequiredSkill | undefined;
    itemsRequired: RequiredItem[] | undefined;
    itemsToKeep: ScriptStringArray;
    knownRecipe: ScriptString;
    sprite: ScriptString;
    thumpSound: ScriptString;
    timeNeeded: ScriptInt;
    wallType: ScriptString;
    xp: XPReward | undefined;

    constructor(bag: ParseBag) {
        super(bag, ':');
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'bonushealth':
                this.bonusHealth = getInt(value);
                return true;
            case 'bonusskill':
                this.bonusSkill = getBoolean(value);
                return true;
            case 'canbarricade':
                this.canBarricade = getBoolean(value);
                return true;
            case 'canbeplastered':
                this.canBePlastered = getBoolean(value);
                return true;
            case 'completionsound':
                this.completionSound = getString(value);
                return true;
            case 'craftingsound':
                this.craftingSound = getString(value);
                return true;
            case 'id':
                this.id = getString(value);
                return true;
            case 'itemsrequired':
                this.itemsRequired = [];
                const split = getString(value).split(';');
                for (const entry of split) {
                    const [item, sAmount] = entry.split('=');
                    this.itemsRequired.push(
                        new RequiredItem(item, getInt(sAmount)),
                    );
                }
                return true;
            case 'itemstokeep':
                this.itemsToKeep = getString(value).split(';');
                return true;
            case 'knownrecipe':
                this.knownRecipe = getString(value);
                return true;
            case 'name':
                this.name = getString(value);
                return true;
            case 'northsprite':
                this.northSprite = getString(value);
                return true;
            case 'previousstage':
                this.previousStages = getString(value)
                    .split(';')
                    .map((o) => o.trim());
                return true;
            case 'skillrequired':
                const [skill, sLevel] = getString(value).split('=');
                this.skillRequired = new RequiredSkill(skill, getInt(sLevel));
                return true;
            case 'sprite':
                this.sprite = getString(value);
                return true;
            case 'thumpsound':
                this.thumpSound = getString(value);
                return true;
            case 'timeneeded':
                this.timeNeeded = getInt(value);
                return true;
            case 'walltype':
                this.wallType = getString(value);
                return true;
            case 'xp':
                const [type, sAmount] = getString(value).split('=');
                this.xp = new XPReward(type, getInt(sAmount));
                return true;
        }
        return false;
    }
}
