import { AnimationScript } from './animation/AnimationScript';
import { EvolvedRecipeScript } from './recipe/EvolvedRecipeScript';
import { FixingScript } from './fixing/FixingScript';
import { AlarmClockClothingItem } from './item/AlarmClockClothingItem';
import { AlarmClockItem } from './item/AlarmClockItem';
import { ClothingItem } from './item/ClothingItem';
import { ContainerItem } from './item/ContainerItem';
import { DrainableItem } from './item/DrainableItem';
import { FoodItem } from './item/FoodItem';
import { ItemScript } from './item/ItemScript';
import { KeyItem } from './item/KeyItem';
import { KeyRingItem } from './item/KeyringItem';
import { LiteratureItem } from './item/LiteratureItem';
import { MapItem } from './item/MapItem';
import { MoveableItem } from './item/MoveableItem';
import { ComboItem } from './item/ComboItem';
import { RadioItem } from './item/RadioItem';
import { WeaponItem } from './item/WeaponItem';
import { WeaponPartItem } from './item/WeaponPartItem';
import { MannequinScript } from './MannequinScript';
import { ModelScript } from './model/ModelScript';
import { RecipeScript } from './recipe/RecipeScript';
import { RuntimeAnimationScript } from './animation/RuntimeAnimationScript';
import { SoundScript } from './sound/SoundScript';
import { SoundTimelineScript } from './sound/SoundTimelineScript';
import { UniqueRecipeScript } from './recipe/UniqueRecipeScript';
import { VehicleEngineRPMScript as VehicleEngineRPMScript } from './vehicle/VehicleEngineRPMScript';
import { VehicleScript } from './vehicle/VehicleScript';
import { VehicleTemplateScript } from './vehicle/VehicleTemplateScript';
import { ParseBag, ParseError } from '../Parser';
import { AnimationsMeshScript } from './animation/AnimationsMeshScript';
import { MultiStageBuildScript } from './multistagebuild/MultiStageBuildScript';

export class ModuleScript {
    readonly animations: { [name: string]: AnimationScript } = {};
    readonly animationsMeshes: { [name: string]: AnimationsMeshScript } = {};
    readonly evolvedRecipes: { [name: string]: EvolvedRecipeScript } = {};
    readonly fixings: { [name: string]: FixingScript } = {};
    readonly imports: string[] = [];
    readonly importedModules: { [name: string]: ModuleScript } = {};
    readonly items: { [name: string]: ItemScript } = {};
    readonly mannequins: { [name: string]: MannequinScript } = {};
    readonly models: { [name: string]: ModelScript } = {};
    readonly multiStageBuilds: { [name: string]: MultiStageBuildScript } = {};
    readonly recipes: { [name: string]: RecipeScript } = {};
    readonly runtimeAnimations: { [name: string]: RuntimeAnimationScript } = {};
    readonly sounds: { [name: string]: SoundScript } = {};
    readonly soundTimelines: { [name: string]: SoundTimelineScript } = {};
    readonly uniqueRecipes: { [name: string]: UniqueRecipeScript } = {};
    readonly vehicles: { [name: string]: VehicleScript } = {};
    readonly vehicleTemplates: { [name: string]: VehicleTemplateScript } = {};
    readonly vehicleEngines: { [name: string]: VehicleEngineRPMScript } = {};

    readonly __name: string;

    constructor(bag: ParseBag) {
        this.__name = bag.next();

        if (this.__name !== undefined && this.__name === '') {
            throw new Error(`Name is empty.`);
        }

        if (bag.next() !== '{') {
            throw new ParseError(`Expected '{'`);
        }

        while (!bag.isEOF()) {
            const curr = bag.peek();
            if (curr === '}') {
                bag.next();
                return;
            }
            this.onParse(bag);
        }
    }

    onImports(bag: ParseBag) {
        if (bag.next() !== '{') {
            new ParseError(
                `Expected '{' near 'imports' for module '${this.__name}'.`,
            );
        }

        while (!bag.isEOF()) {
            const line = bag.next().trim().replace(/\,/g, '');

            if (line === undefined) {
                throw new ParseError(
                    `Unexpected EOF near 'imports' for module '${this.__name}'.`,
                );
            } else if (line === '') {
                continue;
            } else if (line === '}') {
                return;
            }

            this.imports.push(line);
        }
    }

    onParse(bag: ParseBag) {
        while (!bag.isEOF()) {
            const curr = bag.next();
            switch (curr) {
                case '}':
                    return;
                case 'alarmclock':
                    const alarmClock = new AlarmClockItem(bag);
                    this.items[alarmClock.__name!!] = alarmClock;
                    break;
                case 'animation':
                    const animation = new AnimationScript(bag);
                    this.animations[animation.__name!!] = animation;
                    break;
                case 'animationsmesh':
                    const animationsMesh = new AnimationsMeshScript(bag);
                    this.animationsMeshes[animationsMesh.__name!!] =
                        animationsMesh;
                    break;
                case 'evolvedrecipe':
                    const evolvedRecipe = new EvolvedRecipeScript(bag);
                    this.evolvedRecipes[evolvedRecipe.__name!!] = evolvedRecipe;
                    break;
                case 'fixing':
                    const fixing = new FixingScript(bag);
                    this.fixings[fixing.__name!!] = fixing;
                    break;
                case 'imports':
                    this.onImports(bag);
                    break;
                case 'item':
                    const item = ModuleScript.createItem(bag);
                    this.items[item.__name!!] = item;
                    break;
                case 'mannequin':
                    const mannequin = new MannequinScript(bag);
                    this.mannequins[mannequin.__name!!] = mannequin;
                    break;
                case 'model':
                    const model = new ModelScript(bag);
                    this.models[model.__name!!] = model;
                    break;
                case 'multistagebuild':
                    const multiStageBuild = new MultiStageBuildScript(bag);
                    this.multiStageBuilds[multiStageBuild.__name!!] =
                        multiStageBuild;
                    break;
                case 'recipe':
                    const recipe = new RecipeScript(bag);
                    this.recipes[recipe.__name!!] = recipe;
                    break;
                case 'sound':
                    const sound = new SoundScript(bag);
                    this.sounds[sound.__name!!] = sound;
                    break;
                case 'soundtimeline':
                    const soundTimeline = new SoundTimelineScript(bag);
                    this.soundTimelines[soundTimeline.__name!!] = soundTimeline;
                    break;
                case 'uniquerecipe':
                    const uniqueRecipe = new UniqueRecipeScript(bag);
                    this.uniqueRecipes[uniqueRecipe.__name!!] = uniqueRecipe;
                    break;
                case 'vehicle':
                    const vehicle = new VehicleScript(bag);
                    this.vehicles[vehicle.__name!!] = vehicle;
                    break;
                case 'vehicleenginerpm':
                    const vehicleEngineRPM = new VehicleEngineRPMScript(bag);
                    this.vehicleEngines[vehicleEngineRPM.__name!!] = vehicleEngineRPM;
                    break;
                case 'template vehicle':
                    const vehicleTemplate = new VehicleTemplateScript(bag);
                    this.vehicleTemplates[vehicleTemplate.__name!!] =
                        vehicleTemplate;
                    break;
                default:
                    console.warn('Unknown Module category: ' + curr);
            }
        }
    }

    toJSON(): any {
        const o: any = {
            __name: this.__name,
        };

        const toArray = (obj: any): any | undefined => {
            const keys = Object.keys(obj).sort((a, b) => a.localeCompare(b));
            if (keys.length === 0) return undefined;
            const array: any[] = [];
            for (const key of keys) {
                const value = obj[key];
                array.push(value.toJSON());
            }
            return array;
        };

        o.animations = toArray(this.animations);
        o.animationsMeshes = toArray(this.animationsMeshes);
        o.evolvedRecipes = toArray(this.evolvedRecipes);
        o.fixings = toArray(this.fixings);
        if (this.imports.length) o.imports = this.imports;
        o.items = toArray(this.items);
        o.mannequins = toArray(this.mannequins);
        o.models = toArray(this.models);
        o.multiStageBuilds = toArray(this.multiStageBuilds);
        o.recipes = toArray(this.recipes);
        o.sounds = toArray(this.sounds);
        o.vehicles = toArray(this.vehicles);
        o.vehicleTemplates = toArray(this.vehicleTemplates);

        return o;
    }

    static createItem(bag: ParseBag): ItemScript {
        let type: string = '';

        const offsetOrig = bag.offset;

        while (!bag.isEOF()) {
            const token = bag.next().toLowerCase();
            if (token.startsWith('type')) {
                type = token.split('=')[1];
                break;
            }
        }

        bag.offset = offsetOrig;

        switch (type) {
            case 'alarmclock':
                return new AlarmClockItem(bag);
            case 'alarmclockclothing':
                return new AlarmClockClothingItem(bag);
            case 'clothing':
                return new ClothingItem(bag);
            case 'container':
                return new ContainerItem(bag);
            case 'drainable':
                return new DrainableItem(bag);
            case 'food':
                return new FoodItem(bag);
            case 'key':
                return new KeyItem(bag);
            case 'keyring':
                return new KeyRingItem(bag);
            case 'literature':
                return new LiteratureItem(bag);
            case 'map':
                return new MapItem(bag);
            case 'moveable':
                return new MoveableItem(bag);
            case 'radio':
                return new RadioItem(bag);
            case 'weapon':
                return new WeaponItem(bag);
            case 'weaponpart':
                return new WeaponPartItem(bag);
            case 'normal':
                return new ComboItem(bag);
            default:
                throw new ParseError(`Unknown item type: ${type}`);
        }
    }
}
