import { AssignmentStatement, ObjectStatement } from 'ast';
import { ScriptObject } from './ScriptObject';

export class MannequinScript extends ScriptObject {
    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            default:
                console.warn(`[${this.__name}] :: Unknown property: ${property}`);
                break;
        }
    }
}
