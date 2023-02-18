import { AssignmentStatement } from 'ast';
import exp = require('constants');
import { AnimationScript } from './AnimationScript';
import { EvolvedRecipeScript } from './EvolvedRecipeScript';
import { FixingScript } from './FixingScript';
import { ItemScript } from './item/ItemScript';
import { MannequinScript } from './MannequinScript';
import { ModelScript } from './ModelScript';
import { RecipeScript } from './RecipeScript';
import { RuntimeAnimationScript } from './RuntimeAnimationScript';
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

    constructor(statement: AssignmentStatement) {
        if (statement.value.type !== 'ModuleConstructorExpression') {
            throw new Error(
                `statement.value.type is not 'ModuleConstructorExpression'. (Given: '${statement.value.type}')`,
            );
        }

        this.name = statement.id.value;
        if (this.name == null || this.name === '') {
            throw new Error(`statement.id.value is null or empty.`);
        }
    }
}
