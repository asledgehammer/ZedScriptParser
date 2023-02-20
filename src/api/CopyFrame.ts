import { AssignmentStatement } from 'ast';
import { getInt, getString, ScriptInt, ScriptString } from './ScriptObject';

export type ScriptCopyFrameArray = CopyFrame[] | undefined;

export class CopyFrame {
    frame: ScriptInt;
    source: ScriptString;
    sourceFrame: ScriptInt;

    constructor(statement: AssignmentStatement) {
        if (statement.value.type !== 'ObjectConstructorExpression') {
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
            case 'sourceframe':
                this.sourceFrame = getInt(statement);
                break;
        }
    }
}
