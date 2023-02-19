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
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'digitalpadlock':
                this.digitalPadlock = getBoolean(statement);
                return;
            case 'padlock':
                this.padlock = getBoolean(statement);
                return;
        }
        super.onStatement(statement);
    }

    getType(): String {
        return 'Key';
    }
}
