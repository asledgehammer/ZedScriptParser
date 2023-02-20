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

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'bitedefense':
                this.biteDefense = getFloat(statement);
                return true;
            case 'bulletdefense':
                this.bulletDefense = getFloat(statement);
                return true;
            case 'canhaveholes':
                this.canHaveHoles = getBoolean(statement);
                return true;
            case 'chancetofall':
                this.chanceToFall = getInt(statement);
                return true;
            case 'combatspeedmodifier':
                this.combatSpeedModifier = getFloat(statement);
                return true;
            case 'conditionlowerchanceonein':
                this.conditionLowerChanceOneIn = getInt(statement);
                return true;
            case 'neckprotectionmodifier':
                this.neckProtectionModifier = getFloat(statement);
                return true;
            case 'removeonbroken':
                this.removeOnBroken = getBoolean(statement);
                return true;
            case 'runspeedmodifier':
                this.runSpeedModifier = getFloat(statement);
                return true;
            case 'scratchdefense':
                this.scratchDefense = getFloat(statement);
                return true;
            case 'spritename':
                this.spriteName = getString(statement);
                return true;
            case 'stomppower':
                this.stompPower = getFloat(statement);
                return true;
            case 'temperature':
                this.temperature = getFloat(statement);
                return true;
            case 'insulation':
                this.insulation = getFloat(statement);
                return true;
            case 'WaterResistance':
                this.waterResistance = getFloat(statement);
                return true;
            case 'weightwet':
                this.weightWet = getFloat(statement);
                return true;
            case 'windresistance':
                this.windResistance = getFloat(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    getType(): String {
        return 'Clothing';
    }
}
