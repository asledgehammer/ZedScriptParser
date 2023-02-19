import { getBoolean, ScriptBoolean } from '../../api/ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class KeyItem extends ItemScript {

    digitalPadlock: ScriptBoolean;
    padlock: ScriptBoolean;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        super.onStatement(statement);
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'digitalpadlock':
                this.digitalPadlock = getBoolean(statement);
                break;
            case 'padlock':
                this.padlock = getBoolean(statement);
                break;
            default:
                // console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }

    getType(): String {
        return 'Key';
    }
}
