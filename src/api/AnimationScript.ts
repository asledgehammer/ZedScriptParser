import { AssignmentStatement } from 'ast';
import { ScriptObject } from './ScriptObject';

export class AnimationScript extends ScriptObject {
    meshFile: string | undefined;
    animationDirectories: string[] | undefined;

    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'meshname':
                this.meshFile = this.getStringValue(statement);
                break;
            case 'animationdirectory':
                const value = this.getStringValue(statement)!!;
                if (value != null) {
                    if (this.animationDirectories == null) {
                        this.animationDirectories = [];
                    }
                    this.animationDirectories.push(value);
                }
                break;
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }

        throw new Error('Method not implemented.');
    }
}
