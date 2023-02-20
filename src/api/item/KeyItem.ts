import { getBoolean, ScriptBoolean } from '../../api/ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class KeyItem extends ItemScript {

    digitalPadlock: ScriptBoolean;
    padlock: ScriptBoolean;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'digitalpadlock':
                this.digitalPadlock = getBoolean(statement);
                return true;
            case 'padlock':
                this.padlock = getBoolean(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Key';
    }
}
