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
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'bitedefense':
                this.biteDefense = getFloat(statement);
                return;
            case 'bulletdefense':
                this.bulletDefense = getFloat(statement);
                return;
            case 'canhaveholes':
                this.canHaveHoles = getBoolean(statement);
                return;
            case 'chancetofall':
                this.chanceToFall = getInt(statement);
                return;
            case 'combatspeedmodifier':
                this.combatSpeedModifier = getFloat(statement);
                return;
            case 'conditionlowerchanceonein':
                this.conditionLowerChanceOneIn = getInt(statement);
                return;
            case 'neckprotectionmodifier':
                this.neckProtectionModifier = getFloat(statement);
                return;
            case 'removeonbroken':
                this.removeOnBroken = getBoolean(statement);
                return;
            case 'runspeedmodifier':
                this.runSpeedModifier = getFloat(statement);
                return;
            case 'scratchdefense':
                this.scratchDefense = getFloat(statement);
                return;
            case 'spritename':
                this.spriteName = getString(statement);
                return;
            case 'stomppower':
                this.stompPower = getFloat(statement);
                return;
            case 'temperature':
                this.temperature = getFloat(statement);
                return;
            case 'insulation':
                this.insulation = getFloat(statement);
                return;
            case 'WaterResistance':
                this.waterResistance = getFloat(statement);
                return;
            case 'weightwet':
                this.weightWet = getFloat(statement);
                return;
            case 'windresistance':
                this.windResistance = getFloat(statement);
                return;
        }
        super.onStatement(statement);
    }

    getType(): String {
        return 'Clothing';
    }
}
