import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class LiteratureItem extends ItemScript {
    canBeWrite: ScriptBoolean;
    lvlSkillTrained: ScriptInt;
    numberOfPages: ScriptInt;
    numLevelsTrained: ScriptInt;
    pageToWrite: ScriptInt;
    skillTrained: ScriptString;
    teachedRecipes: ScriptStringArray;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'canbewrite':
                this.canBeWrite = getBoolean(statement);
                return true;
            case 'lvlskilltrained':
                this.lvlSkillTrained = getInt(statement);
                return true;
            case 'numberofpages':
                this.numberOfPages = getInt(statement);
                return true;
            case 'numlevelstrained':
                this.numLevelsTrained = getInt(statement);
                return true;
            case 'pagetowrite':
                this.pageToWrite = getInt(statement);
                return true;
            case 'skilltrained':
                this.skillTrained = getString(statement);
                return true;
            case 'teachedrecipes':
                this.teachedRecipes = getString(statement)
                    ?.split(';')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Literature';
    }
}
