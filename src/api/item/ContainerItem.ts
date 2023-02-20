import {
    getInt,
    getString,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class ContainerItem extends ItemScript {
    canBeEquipped: ScriptString;
    capacity: ScriptInt;
    closeSound: ScriptString;
    onlyAcceptCategory: ScriptString;
    openSound: ScriptString;
    putInSound: ScriptString;
    soundParameter: ScriptStringArray;
    weightReduction: ScriptInt;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'canbeequipped':
                this.canBeEquipped = getString(statement);
                return true;
            case 'capacity':
                this.capacity = getInt(statement);
                return true;
            case 'closesound':
                this.closeSound = getString(statement);
                return true;
            case 'onlyacceptcategory':
                this.onlyAcceptCategory = getString(statement);
                return true;
            case 'opensound':
                this.openSound = getString(statement);
                return true;
            case 'putinsound':
                this.putInSound = getString(statement);
                return true;
            case 'soundparameter':
                this.soundParameter = getString(statement)?.split(' ');
                return true;
            case 'weightreduction':
                this.weightReduction = getInt(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Container';
    }
}
