import { AssignmentStatement, ObjectStatement } from 'ast';
import {
    getBoolean,
    getString,
    ScriptBoolean,
    ScriptObject,
    ScriptString,
} from './ScriptObject';

export class MannequinScript extends ScriptObject {
    animSet: ScriptString;
    animState: ScriptString;
    female: ScriptBoolean;
    model: ScriptString;
    outfit: ScriptString;
    pose: ScriptString;
    texture: ScriptString;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'animset':
                this.animSet = getString(statement);
                return true;
            case 'animstate':
                this.animState = getString(statement);
                return true;
            case 'female':
                this.female = getBoolean(statement);
                return true;
            case 'model':
                this.model = getString(statement);
                return true;
            case 'outfit':
                this.outfit = getString(statement);
                return true;
            case 'pose':
                this.pose = getString(statement);
                return true;
            case 'texture':
                this.texture = getString(statement);
                return true;
        }
        return false;
    }

    allowCustomProperties(): boolean {
        return true;
    }
}
