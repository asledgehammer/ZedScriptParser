import { ScriptObject } from "api/ScriptObject";
import { AssignmentStatement } from "ast";

export class LiteratureItem extends ScriptObject {
    
    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }
}