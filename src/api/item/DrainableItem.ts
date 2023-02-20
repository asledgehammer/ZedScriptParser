import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptFloat,
    ScriptInt,
    ScriptString,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class DrainableItem extends ItemScript {
    cantBeConsolided: ScriptBoolean;
    consolidateOption: ScriptString;
    fillFromDispenserSound: ScriptString;
    fillFromTapSound: ScriptString;
    hairDye: ScriptBoolean;
    mechanicsItem: ScriptBoolean;
    replaceOnDeplete: ScriptString;
    ticksPerEquipUse: ScriptInt;
    useWhileUnequipped: ScriptBoolean;
    vehicleType: ScriptInt;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'cantbeconsolided':
                this.cantBeConsolided = getBoolean(statement);
                return true;
            case 'consolidateoption':
                this.consolidateOption = getString(statement);
                return true;
            case 'fillfromdispensersound':
                this.fillFromDispenserSound = getString(statement);
                return true;
            case 'fillfromtapsound':
                this.fillFromTapSound = getString(statement);
                return true;
            case 'hairdye':
                this.hairDye = getBoolean(statement);
                return true;
            case 'mechanicsitem':
                this.mechanicsItem = getBoolean(statement);
                return true;
            case 'replaceondeplete':
                this.replaceOnDeplete = getString(statement);
                return true;
            case 'ticksperequipuse':
                this.ticksPerEquipUse = getInt(statement);
                return true;
            case 'usewhileunequipped':
                this.useWhileUnequipped = getBoolean(statement);
                return true;
            case 'vehicletype':
                this.vehicleType = getInt(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Draining';
    }
}
