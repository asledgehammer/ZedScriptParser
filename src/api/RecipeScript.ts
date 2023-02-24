import { AssignmentStatement, ObjectStatement } from 'ast';
import { ScriptRecipeSourceArray } from './RecipeSource';
import {
    ScriptBoolean,
    ScriptInt,
    ScriptObject,
    ScriptString,
} from './ScriptObject';

export class RecipeScript extends ScriptObject {
    allowRottenItem: ScriptBoolean;
    bakingSoda: ScriptInt;
    category: ScriptString;
    flour: ScriptInt;
    needToBeLearn: ScriptBoolean;
    onCanPerform: ScriptString;
    onCreate: ScriptString;
    onGiveXP: ScriptString;
    result: ScriptString;
    sound: ScriptString;
    time: ScriptInt;
    water: ScriptInt;

    sources: ScriptRecipeSourceArray = [];

    constructor(statement: ObjectStatement) {
        super(statement);

        if (statement.value.type !== 'RecipeConstructor') {
            throw new Error();
        }

        if (
            statement.value.sources != null &&
            statement.value.sources.length !== 0
        ) {
            this.sources = [];

            for (const source of statement.value.sources) {
                const { items, action } = source;
                console.log(items)
                //this.sources.push(new RecipeSource(items, action));
            }
        }
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
