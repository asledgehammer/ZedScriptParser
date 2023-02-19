import { AssignmentStatement, ObjectStatement } from 'ast';
import { CopyFrame } from './CopyFrame';
import { CopyFrames } from './CopyFrames';
import {
    getString,
    ScriptObject,
    ScriptString,
    ScriptStringArray,
} from './ScriptObject';

export class AnimationScript extends ScriptObject {
    meshFile: ScriptString;
    animationDirectories: ScriptStringArray;

    copyFrame: CopyFrame[] | undefined;
    copyFrames: CopyFrames[] | undefined;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        console.log(property);
        switch (property.toLowerCase()) {
            case 'copyframe':
                if (this.copyFrame == null) this.copyFrame = [];
                this.copyFrame.push(new CopyFrame(statement));
                break;
            case 'copyframes':
                if (this.copyFrames == null) this.copyFrames = [];
                this.copyFrames.push(new CopyFrames(statement));
                break;
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
                console.warn(
                    `[${this.__name}] :: Unknown property: ${property}`,
                );
                break;
        }
    }
}
