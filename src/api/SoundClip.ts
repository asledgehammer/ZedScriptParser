import { AssignmentStatement } from 'ast';
import { ScriptObject } from './ScriptObject';

export class SoundClip extends ScriptObject {
    distanceMin: number | undefined;
    distanceMax: number | undefined;
    event: string | undefined;
    file: string | undefined;
    pitch: number | undefined;
    volume: number | undefined;
    reverbFactor: number | undefined;
    reverbMaxRange: number | undefined;

    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'distancemin':
                this.distanceMin = this.getIntValue(statement);
                break;
            case 'distancemax':
                this.distanceMax = this.getIntValue(statement);
                break;
            case 'event':
                this.event = this.getStringValue(statement);
                break;
            case 'file':
                this.file = this.getStringValue(statement);
                break;
            case 'pitch':
                this.pitch = this.getFloatValue(statement);
                break;
            case 'volume':
                this.volume = this.getFloatValue(statement);
                break;
            case 'reverbfactor':
                this.reverbFactor = this.getFloatValue(statement);
                break;
            case 'reverbmaxrange':
                this.reverbMaxRange = this.getFloatValue(statement);
                break;
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }
}
