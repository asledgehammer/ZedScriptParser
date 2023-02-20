import { AssignmentStatement, ObjectStatement } from 'ast';
import {
    getBoolean,
    getInt,
    getString,
    ScriptBoolean,
    ScriptInt,
    ScriptObject,
    ScriptString,
} from './ScriptObject';
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
        this.ignoreProperties['__id'] = true;
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'category':
                this.category = getString(statement);
                return true;
            case 'is3d':
                this.is3D = getBoolean(statement);
                return true;
            case 'loop':
                this.loop = getBoolean(statement);
                return true;
            case 'master':
                this.master = getString(statement) as MasterVolume;
                return true;
            case 'maxinstancesperemitter':
                this.maxInstancesPerEmitter = getInt(statement);
                return true;
            case 'clip':
                this.clip = new SoundClip(statement);
                return true;
        }
        return false;
    }

    toJSON(): any {
        let o: any = {};
        const thisKeys: string[] = Object.keys(this);

        /* (Sort all keys alphanumerically) */
        thisKeys.sort((a, b) => a.localeCompare(b));

        for (const key of thisKeys) {
            if (key === 'ignoreProperties') continue;

            /* (Ignore keys that specific objects define) */
            if (this.ignoreProperties[key]) continue;

            /* (Only add custom properties if populated) */
            if (
                key === 'customProperties' &&
                Object.keys(this.customProperties!!).length === 0
            ) {
                continue;
            }

            if (key === 'clip') {
                o['clip'] = this.clip!!.toJSON();
            }

            /* (Add property to the exported JSON object) */
            o[key as string] = (this as any)[key];
        }
        return o;
    }

    allowCustomProperties(): boolean {
        return true;
    }
}
