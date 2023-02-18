import { AssignmentStatement } from 'ast';
import { ScriptObject } from './ScriptObject';
import { SoundClip } from './SoundClip';

export type MasterVolume = 'Primary' | 'Ambient' | 'Music' | 'VehicleEngine';

export class SoundScript extends ScriptObject {
    category: string | undefined;
    is3D: boolean | undefined;
    loop: boolean | undefined;
    master: MasterVolume | undefined;
    maxInstancesPerEmitter: number | undefined;
    clip: SoundClip | undefined;

    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'category':
                this.category = this.getStringValue(statement);
                break;
            case 'is3d':
                this.is3D = this.getBooleanValue(statement);
                break;
            case 'loop':
                this.loop = this.getBooleanValue(statement);
                break;
            case 'master':
                this.master = this.getStringValue(statement) as MasterVolume;
                break;
            case 'maxInstancesPerEmitter':
                this.maxInstancesPerEmitter = this.getIntValue(statement);
                break;
            case 'clip':
                this.clip = new SoundClip(statement);
                break;
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }
}
