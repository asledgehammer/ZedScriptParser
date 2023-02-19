import { AssignmentStatement, ObjectStatement } from 'ast';
import { getString, ScriptObject, ScriptString, ScriptStringArray } from './ScriptObject';

export class AnimationScript extends ScriptObject {
    meshFile: ScriptString;
    animationDirectories: ScriptStringArray;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'meshname':
                this.meshFile = getString(statement);
                break;
            case 'animationdirectory':
                const value = getString(statement)!!;
                if (value != null) {
                    if (this.animationDirectories == null) {
                        this.animationDirectories = [];
                    }
                    this.animationDirectories.push(value);
                }
                break;
            default:
                console.warn(`[${this.__name}] :: Unknown property: ${property}`);
                break;
        }

        throw new Error('Method not implemented.');
    }
}
