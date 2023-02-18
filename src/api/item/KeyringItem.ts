import { AssignmentStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class KeyRingItem extends ItemScript {
    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        super.onStatement(statement);
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }
}
