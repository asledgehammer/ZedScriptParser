import {
    AssignmentStatement,
    Identifier,
    ImportsStatement,
    ObjectStatement,
} from 'ast';
import { AnimationScript } from './AnimationScript';
import { EvolvedRecipeScript } from './EvolvedRecipeScript';
import { FixingScript } from './FixingScript';
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
import { ModelScript } from './ModelScript';
import { RecipeScript } from './RecipeScript';
import { RuntimeAnimationScript } from './RuntimeAnimationScript';
import { getString } from './ScriptObject';
import { SoundScript } from './SoundScript';
import { SoundTimelineScript } from './SoundTimelineScript';
import { UniqueRecipeScript } from './UniqueRecipeScript';
import { VehicleEngineScript } from './VehicleEngineScript';
import { VehicleScript } from './VehicleScript';
import { VehicleTemplateScript } from './VehicleTemplateScript';

export class ScriptModule {
    readonly animations: { [name: string]: AnimationScript } = {};
    readonly evolvedRecipes: { [name: string]: EvolvedRecipeScript } = {};
    readonly fixings: { [name: string]: FixingScript } = {};
    readonly imports: { [name: string]: string } = {};
    readonly importedModules: { [name: string]: ScriptModule } = {};
    readonly items: { [name: string]: ItemScript } = {};
    readonly mannequins: { [name: string]: MannequinScript } = {};
    readonly models: { [name: string]: ModelScript } = {};
    readonly recipes: { [name: string]: RecipeScript } = {};
    readonly runtimeAnimations: { [name: string]: RuntimeAnimationScript } = {};
    readonly sounds: { [name: string]: SoundScript } = {};
    readonly soundTimelines: { [name: string]: SoundTimelineScript } = {};
    readonly uniqueRecipes: { [name: string]: UniqueRecipeScript } = {};
    readonly vehicles: { [name: string]: VehicleScript } = {};
    readonly vehicleTemplates: { [name: string]: VehicleTemplateScript } = {};
    readonly vehicleEngines: { [name: string]: VehicleEngineScript } = {};
    readonly name: string;

    constructor(name: string) {
        this.name = name;
        if (this.name == null || this.name === '') {
            throw new Error(`statement.id.value is null or empty.`);
        }
    }

    private onImport(statement: ImportsStatement) {}

    parse(statement: AssignmentStatement) {
        if (statement.value.type !== 'ModuleConstructorExpression') {
            throw new Error();
        }

        for (const entry of statement.value.body) {
            if (entry.type === 'ImportStatement') {
                this.onImport(entry);
                continue;
            } else {
                switch (entry.category.value.toLowerCase()) {
                    case 'animation':
                        const animation = new AnimationScript(entry);
                        this.animations[animation.__id!!] = animation;
                        continue;
                    case 'item':
                        const item = ScriptModule.createItem(entry);
                        this.items[item.__id!!] = item;
                        continue;
                    case 'sound':
                        const sound = new SoundScript(entry);
                        this.sounds[sound.__id!!] = sound;
                        continue;
                    default:
                        // console.log(
                        //     'Unknown object type: ' + entry.category.value,
                        // );
                }
            }
        }
    }

    static createItem(statement: ObjectStatement): ItemScript {
        const body: { [name: string]: any } = statement.value.body;
        let type: string = '';
        const statements: AssignmentStatement[] = Object.values(
            statement.value.body,
        );
        for (const next of statements) {
            if (next.id.value.toLowerCase() === 'type') {
                type = getString(next)!!;
                break;
            }
        }

        switch (type.toLowerCase()) {
            case 'alarmclock':
                return new AlarmClockItem(statement);
            case 'alarmclockclothing':
                return new AlarmClockClothingItem(statement);
            case 'clothing':
                return new ClothingItem(statement);
            case 'container':
                return new ContainerItem(statement);
            case 'drainable':
                return new DrainableItem(statement);
            case 'food':
                return new FoodItem(statement);
            case 'key':
                return new KeyItem(statement);
            case 'keyring':
                return new KeyRingItem(statement);
            case 'literature':
                return new LiteratureItem(statement);
            case 'map':
                return new MapItem(statement);
            case 'moveable':
                return new MoveableItem(statement);
            case 'radio':
                return new RadioItem(statement);
            case 'weapon':
                return new WeaponItem(statement);
            case 'weaponpart':
                return new WeaponPartItem(statement);
            case 'normal':
                return new ComboItem(statement);
            default:
                console.log(statement.id.value + ' : Unknown item type: ' + type.toLowerCase());
                return new ComboItem(statement);
        }
    }

    toJSON(): any {
        const o: any = {
            animations: [],
            items: [],
            sounds: [],
        };

        const animKeys = Object.keys(this.animations).sort((a, b) =>
            a.localeCompare(b),
        );
        for (const key of animKeys) {
            const anim = this.animations[key];
            o.animations.push(anim.toJSON());
        }

        const itemKeys = Object.keys(this.items).sort((a, b) =>
            a.localeCompare(b),
        );
        for (const key of itemKeys) {
            const item = this.items[key];
            o.items.push(item.toJSON());
        }

        const soundKeys = Object.keys(this.sounds).sort((a, b) =>
            a.localeCompare(b),
        );
        for (const key of soundKeys) {
            const sound = this.sounds[key];
            o.sounds.push(sound.toJSON());
        }

        return o;
    }
}
