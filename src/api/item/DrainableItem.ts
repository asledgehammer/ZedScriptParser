import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class DrainableItem extends ItemScript {
    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
        }
        return super.onStatement(statement);
    }

    getType(): String {
        return 'Draining';
    }
}
