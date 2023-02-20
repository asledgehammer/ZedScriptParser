import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class MoveableItem extends ItemScript {
    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Moveable';
    }
}
