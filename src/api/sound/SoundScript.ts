import { ParseBag } from '../../parser';
import {
    getBoolean,
    getInt,
    getString,
    Script,
    ScriptBoolean,
    ScriptInt,
    ScriptString,
} from '../Script';
import { SoundClip } from './SoundClip';

export type MasterVolume = 'Primary' | 'Ambient' | 'Music' | 'VehicleEngine';
export type ScriptMasterVolume = MasterVolume | undefined;
export type ScriptSoundClip = SoundClip | undefined;

export class SoundScript extends Script {
    category: ScriptString;
    is3D: ScriptBoolean;
    loop: ScriptBoolean;
    master: ScriptMasterVolume;
    maxInstancesPerEmitter: ScriptInt;
    clip: ScriptSoundClip;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
            case 'clip':
                this.clip = new SoundClip(bag);
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'category':
                this.category = getString(value);
                return true;
            case 'is3d':
                this.is3D = getBoolean(value);
                return true;
            case 'loop':
                this.loop = getBoolean(value);
                return true;
            case 'master':
                this.master = getString(value) as MasterVolume;
                return true;
            case 'maxinstancesperemitter':
                this.maxInstancesPerEmitter = getInt(value);
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
                Object.keys(this.__properties!!).length === 0
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
}
