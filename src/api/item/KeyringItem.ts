import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class KeyRingItem extends ItemScript {
    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
        }
        super.onStatement(statement);
    }

    getType(): String {
        return 'KeyRing';
    }
}
