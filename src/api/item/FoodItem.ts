import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';
import { EvolvedRecipe, ScriptEvolvedRecipeArray } from './EvolvedRecipe';

export class FoodItem extends ItemScript {
    alcoholic: ScriptBoolean;
    badCold: ScriptBoolean;
    badInMicrowave: ScriptBoolean;
    cannedFood: ScriptBoolean;
    cantBeFrozen: ScriptBoolean;
    cantEat: ScriptBoolean;
    cookingSound: ScriptString;
    dangerousUncooked: ScriptBoolean;
    daysFresh: ScriptInt;
    daysTotallyRotten: ScriptInt;
    enduranceChange: ScriptInt;
    evolvedRecipe: ScriptEvolvedRecipeArray;
    fluReduction: ScriptInt;
    goodHot: ScriptBoolean;
    herbalistType: ScriptString;
    hungerChange: ScriptInt;
    isCookable: ScriptBoolean;
    minutesToBurn: ScriptInt;
    minutesToCook: ScriptInt;
    onCooked: ScriptString;
    onEat: ScriptString;
    packaged: ScriptBoolean;
    painReduction: ScriptInt;
    poisonDetectionLevel: ScriptInt;
    poisonPower: ScriptInt;
    reduceFoodSickness: ScriptInt;
    removeNegativeEffectOnCooked: ScriptBoolean;
    removeUnhappinessWhenCooked: ScriptBoolean;
    replaceOnCooked: ScriptString;
    replaceOnRotten: ScriptString;
    spice: ScriptBoolean;
    thirstChange: ScriptInt;
    useForPoison: ScriptInt;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'badcold':
                this.badCold = getBoolean(statement);
                return true;
            case 'badinmicrowave':
                this.badInMicrowave = getBoolean(statement);
                return true;
            case 'cannedfood':
                this.cannedFood = getBoolean(statement);
                return true;
            case 'cantbefrozen':
                this.cantBeFrozen = getBoolean(statement);
                return true;
            case 'canteat':
                this.cantEat = getBoolean(statement);
                return true;
            case 'cookingsound':
                this.cookingSound = getString(statement);
                return true;
            case 'dangerousuncooked':
                this.dangerousUncooked = getBoolean(statement);
                return true;
            case 'daysfresh':
                this.daysFresh = getInt(statement);
                return true;
            case 'daystotallyrotten':
                this.daysTotallyRotten = getInt(statement);
                return true;
            case 'endurancechange':
                this.enduranceChange = getInt(statement);
                return true;
            case 'evolvedrecipe':
                const split = getString(statement)
                    ?.split(';')
                    .map((a) => {
                        return a.trim();
                    });
                if (split != null) {
                    for (const s of split) {
                        const [name, sAmount] = s.split(':').map((a) => {
                            return a.trim();
                        });
                        if (this.evolvedRecipe == null) this.evolvedRecipe = [];
                        this.evolvedRecipe.push(
                            new EvolvedRecipe(name, parseInt(sAmount)),
                        );
                    }
                }
                return true;
            case 'flureduction':
                this.fluReduction = getInt(statement);
                return true;
            case 'goodhot':
                this.goodHot = getBoolean(statement);
                return true;
            case 'herbalisttype':
                this.herbalistType = getString(statement);
                return true;
            case 'hungerchange':
                this.hungerChange = getInt(statement);
                return true;
            case 'iscookable':
                this.isCookable = getBoolean(statement);
                return true;
            case 'minutestoburn':
                this.minutesToBurn = getInt(statement);
                return true;
            case 'minutestocook':
                this.minutesToCook = getInt(statement);
                return true;
            case 'oncooked':
                this.onCooked = getString(statement);
                return true;
            case 'oneat':
                this.onEat = getString(statement);
                return true;
            case 'packaged':
                this.packaged = getBoolean(statement);
                return true;
            case 'painreduction':
                this.painReduction = getInt(statement);
                return true;
            case 'poisondetectionlevel':
                this.poisonDetectionLevel = getInt(statement);
                return true;
            case 'poisonpower':
                this.poisonPower = getInt(statement);
                return true;
            case 'reducefoodsickness':
                this.reduceFoodSickness = getInt(statement);
                return true;
            case 'removenegativeeffectoncooked':
                this.removeNegativeEffectOnCooked = getBoolean(statement);
                return true;
            case 'removeunhappinesswhencooked':
                this.removeUnhappinessWhenCooked = getBoolean(statement);
                return true;
            case 'replaceoncooked':
                this.replaceOnCooked = getString(statement);
                return true;
            case 'replaceonrotten':
                this.replaceOnRotten = getString(statement);
                return true;
            case 'spice':
                this.spice = getBoolean(statement);
                return true;
            case 'thirstchange':
                this.thirstChange = getInt(statement);
                return true;
            case 'useforpoison':
                this.useForPoison = getInt(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Food';
    }
}
