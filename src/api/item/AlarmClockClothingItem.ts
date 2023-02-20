import { getInt, getString, ScriptInt, ScriptString } from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';
import { ClothingItem } from './ClothingItem';

export class AlarmClockClothingItem extends ClothingItem {

    alarmSound: ScriptString;
    soundRadius: ScriptInt;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'alarmsound':
                this.alarmSound = getString(statement);
                return true;
            case 'soundradius':
                this.soundRadius = getInt(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    getType(): String {
        return 'AlarmClockClothing';
    }
}
