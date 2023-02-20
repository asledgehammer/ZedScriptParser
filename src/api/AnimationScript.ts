import { AssignmentStatement, ObjectStatement } from 'ast';
import { CopyFrame, ScriptCopyFrameArray } from './CopyFrame';
import { CopyFrames, ScriptCopyFramesArray } from './CopyFrames';
import {
    getString,
    ScriptObject,
    ScriptString,
    ScriptStringArray,
} from './ScriptObject';

export class AnimationScript extends ScriptObject {
    meshFile: ScriptString;
    animationDirectories: ScriptStringArray;

    copyFrame: ScriptCopyFrameArray;
    copyFrames: ScriptCopyFramesArray;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'copyframe':
                if (this.copyFrame == null) this.copyFrame = [];
                this.copyFrame.push(new CopyFrame(statement));
                return true;
            case 'copyframes':
                if (this.copyFrames == null) this.copyFrames = [];
                this.copyFrames.push(new CopyFrames(statement));
                return true;
            case 'meshname':
                this.meshFile = getString(statement);
                return true;
            case 'animationdirectory':
                const value = getString(statement)!!;
                if (value != null) {
                    if (this.animationDirectories == null) {
                        this.animationDirectories = [];
                    }
                    this.animationDirectories.push(value);
                }
                return true;
        }
        return false;
    }
}
