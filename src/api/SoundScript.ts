import { AssignmentStatement, ObjectStatement } from 'ast';
import { getBoolean, getInt, getString, ScriptBoolean, ScriptInt, ScriptObject, ScriptString } from './ScriptObject';
import { SoundClip } from './SoundClip';

export type MasterVolume = 'Primary' | 'Ambient' | 'Music' | 'VehicleEngine';
export type ScriptMasterVolume = MasterVolume | undefined;
export type ScriptSoundClip = SoundClip | undefined;

export class SoundScript extends ScriptObject {
    category: ScriptString;
    is3D: ScriptBoolean;
    loop: ScriptBoolean;
    master: ScriptMasterVolume;
    maxInstancesPerEmitter: ScriptInt;
    clip: ScriptSoundClip;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'category':
                this.category = getString(statement);
                break;
            case 'is3d':
                this.is3D = getBoolean(statement);
                break;
            case 'loop':
                this.loop = getBoolean(statement);
                break;
            case 'master':
                this.master = getString(statement) as MasterVolume;
                break;
            case 'maxInstancesPerEmitter':
                this.maxInstancesPerEmitter = getInt(statement);
                break;
            case 'clip':
                this.clip = new SoundClip(statement.value as ObjectStatement);
                break;
            default:
                console.warn(`[${this.__name}] :: Unknown property: ${property}`);
                break;
        }
    }
}
