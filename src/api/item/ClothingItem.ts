import {
    getBoolean,
    getFloat,
    getInt,
    getString,
    ScriptBoolean,
    ScriptFloat,
    ScriptInt,
    ScriptString,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class ClothingItem extends ItemScript {
    biteDefense: ScriptFloat;
    bulletDefense: ScriptFloat;
    canHaveHoles: ScriptBoolean;
    chanceToFall: ScriptInt;
    combatSpeedModifier: ScriptFloat;
    conditionLowerChanceOneIn: ScriptInt;
    insulation: ScriptFloat;
    neckProtectionModifier: ScriptFloat;
    removeOnBroken: ScriptBoolean;
    runSpeedModifier: ScriptFloat;
    scratchDefense: ScriptFloat;
    spriteName: ScriptString;
    stompPower: ScriptFloat;
    temperature: ScriptFloat;
    waterResistance: ScriptFloat;
    weightWet: ScriptFloat;
    windResistance: ScriptFloat;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        super.onStatement(statement);
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'bitedefense':
                this.biteDefense = getFloat(statement);
                break;
            case 'bulletdefense':
                this.bulletDefense = getFloat(statement);
                break;
            case 'canhaveholes':
                this.canHaveHoles = getBoolean(statement);
                break;
            case 'chancetofall':
                this.chanceToFall = getInt(statement);
                break;
            case 'combatspeedmodifier':
                this.combatSpeedModifier = getFloat(statement);
                break;
            case 'conditionlowerchanceonein':
                this.conditionLowerChanceOneIn = getInt(statement);
                break;
            case 'neckprotectionmodifier':
                this.neckProtectionModifier = getFloat(statement);
                break;
            case 'removeonbroken':
                this.removeOnBroken = getBoolean(statement);
                break;
            case 'runspeedmodifier':
                this.runSpeedModifier = getFloat(statement);
                break;
            case 'scratchdefense':
                this.scratchDefense = getFloat(statement);
                break;
            case 'spritename':
                this.spriteName = getString(statement);
                break;
            case 'stomppower':
                this.stompPower = getFloat(statement);
                break;
            case 'temperature':
                this.temperature = getFloat(statement);
                break;
            case 'insulation':
                this.insulation = getFloat(statement);
                break;
            case 'WaterResistance':
                this.waterResistance = getFloat(statement);
                break;
            case 'weightwet':
                this.weightWet = getFloat(statement);
                break;
            case 'windresistance':
                this.windResistance = getFloat(statement);
                break;

            default:
                // this.addCustomProperty(statement);
                // console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }

    getType(): String {
        return 'Clothing';
    }
}
