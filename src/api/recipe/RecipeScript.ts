import { ParseBag } from '../../Parser';
import { Script } from '../Script';
import { RecipeSource } from './RecipeSource';
import { RecipeSourceItem } from './RecipeSourceItem';
import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
} from '../Script';
import { SkillRequirement } from './SkillRequirement';
import { RecipeAction } from './RecipeAction';
import { RecipeResult } from './RecipeResult';
import { RecipeProp } from './RecipeProp';

export class RecipeScript extends Script {
    allowDestroyedItem: ScriptBoolean;
    allowFrozenItem: ScriptBoolean;
    allowRottenItem: ScriptBoolean;
    animNode: ScriptString;
    bakingSoda: ScriptInt;
    canBeDoneFromFloor: ScriptBoolean;
    category: ScriptString;
    flour: ScriptInt;
    inSameInventory: ScriptBoolean;
    isHidden: ScriptBoolean;
    nearItem: ScriptString;
    needToBeLearn: ScriptBoolean;
    noBrokenItems: ScriptBoolean;
    onCanPerform: ScriptString;
    onCreate: ScriptString;
    onGiveXP: ScriptString;
    onTest: ScriptString;
    prop1: RecipeProp | undefined;
    prop2: RecipeProp | undefined;
    removeResultItem: ScriptBoolean;
    result: RecipeResult | undefined;
    sound: ScriptString;
    stopOnWalk: ScriptBoolean;
    time: ScriptInt;
    water: ScriptInt;

    skillsRequired: SkillRequirement[] | undefined;
    sources: RecipeSource[];

    constructor(bag: ParseBag) {
        super(bag, ':', false);

        this.sources = [];
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        const onSource = (tokens: string[], action: RecipeAction): void => {
            const sourceItems: RecipeSourceItem[] = [];

            for (const token of tokens) {
                let name = token;
                let amount = 1;

                // NOTE: I don't understand what's going on here. Both ';' and '=' delimit item amounts.
                //     - Jab, 3/5/2023
                if (token.indexOf('=') !== -1) {
                    const split = token.split('=');
                    name = split[0];
                    amount = parseInt(split[1]);
                } else if (token.indexOf(';') !== -1) {
                    const split = token.split(';');
                    name = split[0];
                    amount = parseInt(split[1]);
                }
                sourceItems.push(new RecipeSourceItem(name, amount));
            }

            this.sources.push(new RecipeSource(sourceItems, action));
        };

        const onKeep = (): void => {
            let tokens = property
                .replace(/\s/g, '')
                .replace('keep', '')
                .split('/')
                .map((o) => {
                    return o.trim();
                });
            onSource(tokens, 'keep');
        };

        const onDestroy = () => {
            let tokens = property
                .replace(/\s/g, '')
                .replace('destroy', '')
                .split('/')
                .map((o) => {
                    return o.trim();
                });

            onSource(tokens, 'destroy');
        };

        const propLower = property.toLowerCase();
        if (propLower.startsWith('keep')) onKeep();
        else if (propLower.startsWith('destroy')) onDestroy();
        else {
            let tokens = property
                .replace(/\s/g, '')
                .split('/')
                .map((o) => {
                    return o.trim();
                });

            onSource(tokens, 'destroy');
        }
        return true;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'allowdestroyeditem':
                this.allowDestroyedItem = getBoolean(value);
                return true;
            case 'allowfrozenitem':
                this.allowFrozenItem = getBoolean(value);
                return true;
            case 'allowrottenitem':
                this.allowRottenItem = getBoolean(value);
                return true;
            case 'animnode':
                this.animNode = getString(value);
                return true;
            case 'bakingsoda':
                this.bakingSoda = getInt(value);
                return true;
            case 'canbedonefromfloor':
                this.canBeDoneFromFloor = getBoolean(value);
                return true;
            case 'category':
                this.category = getString(value);
                return true;
            case 'flour':
                this.flour = getInt(value);
                return true;
            case 'insameinventory':
                this.inSameInventory = getBoolean(value);
                return true;
            case 'ishidden':
                this.isHidden = getBoolean(value);
                return true;
            case 'nearitem':
                this.nearItem = getString(value);
                return true;
            case 'needtobelearn':
                this.needToBeLearn = getBoolean(value);
                return true;
            case 'nobrokenitems':
                this.noBrokenItems = getBoolean(value);
                return true;
            case 'oncanperform':
                this.onCanPerform = getString(value);
                return true;
            case 'oncreate':
                this.onCreate = getString(value);
                return true;
            case 'ongivexp':
                this.onGiveXP = getString(value);
                return true;
            case 'ontest':
                this.onTest = getString(value);
                return true;
            case 'prop1': {
                const raw = getString(value);
                let item = raw.trim();
                let amount = 1;
                if (raw.indexOf('=') !== -1) {
                    const [sItem, sAmount] = raw.split('=').map((o) => {
                        return o.trim();
                    });
                    item = sItem;
                    amount = getInt(sAmount);
                }
                this.prop1 = new RecipeProp(item, amount);
                return true;
            }
            case 'prop2': {
                const raw = getString(value);
                let item = raw.trim();
                let amount = 1;
                if (raw.indexOf('=') !== -1) {
                    const [sItem, sAmount] = raw.split('=').map((o) => {
                        return o.trim();
                    });
                    item = sItem;
                    amount = getInt(sAmount);
                }
                this.prop2 = new RecipeProp(item, amount);
                return true;
            }
            case 'removeresultitem':
                this.removeResultItem = getBoolean(value);
                return true;
            case 'result':
                const raw = getString(value);
                if (raw.indexOf(';') !== -1) {
                    const [item, sAmount] = raw.split(';');
                    this.result = new RecipeResult(
                        item.trim(),
                        getInt(sAmount),
                    );
                } else if (raw.indexOf('=') !== -1) {
                    const [item, sAmount] = raw.split('=');
                    this.result = new RecipeResult(
                        item.trim(),
                        getInt(sAmount),
                    );
                } else {
                    this.result = new RecipeResult(raw.trim(), 1);
                }
                return true;
            case 'skillrequired':
                this.skillsRequired = [];
                if (value.indexOf(';') !== -1) {
                    const split = value.split(';');
                    for (const entry of split) {
                        if (entry === '') continue;
                        const [skill, sLevel] = entry.split('=');
                        this.skillsRequired.push(
                            new SkillRequirement(skill, parseInt(sLevel)),
                        );
                    }
                } else {
                    const [skill, sLevel] = value.split('=');
                    this.skillsRequired.push(
                        new SkillRequirement(skill, parseInt(sLevel)),
                    );
                }
                return true;
            case 'sound':
                this.sound = getString(value);
                return true;
            case 'stoponwalk':
                this.stopOnWalk = getBoolean(value);
                return true;
            case 'time':
                this.time = getInt(value);
                return true;
            case 'water':
                this.water = getInt(value);
                return true;
        }
        return false;
    }
}
