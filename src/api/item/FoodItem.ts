import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class FoodItem extends ItemScript {
    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        super.onStatement(statement);
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            default:
                // console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }

    getType(): String {
        return 'Food';
    }
}
