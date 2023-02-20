import { AssignmentStatement, ObjectStatement } from "ast";
import { ScriptObject } from "./ScriptObject";

export class SoundTimelineScript extends ScriptObject {
    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
        }
        return false;
    }

    allowCustomProperties(): boolean {
        return true;
    }
}