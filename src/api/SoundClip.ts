import { AssignmentStatement, ObjectStatement } from 'ast';
import { getFloat, getInt, getString, ScriptFloat, ScriptInt, ScriptObject, ScriptString } from './ScriptObject';

export class SoundClip extends ScriptObject {
    distanceMin: ScriptInt;
    distanceMax: ScriptInt;
    event: ScriptString;
    file: ScriptString;
    pitch: ScriptFloat;
    volume: ScriptFloat;
    reverbFactor: ScriptFloat;
    reverbMaxRange: ScriptFloat;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'distancemin':
                this.distanceMin = getInt(statement);
                break;
            case 'distancemax':
                this.distanceMax = getInt(statement);
                break;
            case 'event':
                this.event = getString(statement);
                break;
            case 'file':
                this.file = getString(statement);
                break;
            case 'pitch':
                this.pitch = getFloat(statement);
                break;
            case 'volume':
                this.volume = getFloat(statement);
                break;
            case 'reverbfactor':
                this.reverbFactor = getFloat(statement);
                break;
            case 'reverbmaxrange':
                this.reverbMaxRange = getFloat(statement);
                break;
            default:
                console.warn(`[${this.__id}] :: Unknown property: ${property}`);
                break;
        }
    }
}
