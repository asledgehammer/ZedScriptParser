import { getString, ScriptString } from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class MapItem extends ItemScript {

    map: ScriptString;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'map':
                this.map = getString(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Map';
    }
}
