import { AssignmentStatement } from 'ast';
import { getInt, getString, ScriptInt, ScriptString } from './ScriptObject';

export type ScriptCopyFramesArray = CopyFrames[] | undefined;

export class CopyFrames {
    frame: ScriptInt;
    source: ScriptString;
    sourceFrame1: ScriptInt;
    sourceFrame2: ScriptInt;

    constructor(statement: AssignmentStatement) {
        if (statement.value.type !== 'ObjectConstructor') {
            throw new Error();
        }

        for (const s of statement.value.body) {
            this.onStatement(s);
        }
    }

    onStatement(statement: AssignmentStatement) {
        const property = statement.id.value;

        switch (property.toLowerCase()) {
            case 'frame':
                this.frame = getInt(statement);
                break;
            case 'source':
                this.source = getString(statement);
                break;
            case 'sourceframe1':
                this.sourceFrame1 = getInt(statement);
                break;
            case 'sourceframe2':
                this.sourceFrame2 = getInt(statement);
                break;
        }
    }
}
