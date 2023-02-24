import { AssignmentStatement } from 'ast';
import {
    getFloat,
    getInt,
    getString,
    ScriptFloat,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from './ScriptObject';

export class SoundClip {
    __id: string;

    distanceMin: ScriptInt;
    distanceMax: ScriptInt;
    event: ScriptStringArray;
    file: ScriptString;
    pitch: ScriptFloat;
    volume: ScriptFloat;
    reverbFactor: ScriptFloat;
    reverbMaxRange: ScriptFloat;

    constructor(statement: AssignmentStatement) {
        if (statement.value.type !== 'ObjectConstructor') {
            throw new Error();
        }

        this.__id = statement.id.value;
        if (this.__id == null || this.__id === '') {
            throw new Error();
        }

        for (const s of statement.value.body) {
            this.onStatement(s);
        }
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'distancemin':
                this.distanceMin = getInt(statement);
                return true;
            case 'distancemax':
                this.distanceMax = getInt(statement);
                return true;
            case 'event':
                this.event = getString(statement)
                    ?.split('/')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
            case 'file':
                this.file = getString(statement);
                return true;
            case 'pitch':
                this.pitch = getFloat(statement);
                return true;
            case 'volume':
                this.volume = getFloat(statement);
                return true;
            case 'reverbfactor':
                this.reverbFactor = getFloat(statement);
                return true;
            case 'reverbmaxrange':
                this.reverbMaxRange = getFloat(statement);
                return true;
            default:
                console.warn(`[${this.__id}] :: Unknown property: ${property}`);
                return false;
        }
    }

    

    toJSON(): any {
        const o = { ...this };
        // @ts-ignore
        o.__id = undefined;
        return o;
    }
}
