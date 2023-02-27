import { ParseBag } from '../parser';
import {
    getFloat,
    getInt,
    getString,
    Script,
    ScriptFloat,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../Script';

export class SoundClip extends Script {
    distanceMin: ScriptInt;
    distanceMax: ScriptInt;
    event: ScriptStringArray;
    file: ScriptString;
    pitch: ScriptFloat;
    volume: ScriptFloat;
    reverbFactor: ScriptFloat;
    reverbMaxRange: ScriptFloat;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'distancemin':
                this.distanceMin = getInt(value);
                return true;
            case 'distancemax':
                this.distanceMax = getInt(value);
                return true;
            case 'event':
                this.event = getString(value)
                    ?.split('/')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
            case 'file':
                this.file = getString(value);
                return true;
            case 'pitch':
                this.pitch = getFloat(value);
                return true;
            case 'volume':
                this.volume = getFloat(value);
                return true;
            case 'reverbfactor':
                this.reverbFactor = getFloat(value);
                return true;
            case 'reverbmaxrange':
                this.reverbMaxRange = getFloat(value);
                return true;
        }
        return false;
    }
}
