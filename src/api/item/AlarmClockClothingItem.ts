import { getString, ScriptString } from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class AlarmClockClothingItem extends ItemScript {

    spriteName: ScriptString;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        super.onStatement(statement);
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'spritename':
                this.spriteName = getString(statement);
            default:
                // console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }

    getType(): String {
        return 'AlarmClockClothing';
    }
}
