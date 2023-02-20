import { getBoolean, getInt, ScriptBoolean, ScriptInt } from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';

export class RadioItem extends ItemScript {
    acceptMediaType: ScriptInt;
    baseVolumeRange: ScriptInt;
    isHighTier: ScriptBoolean;
    isPortable: ScriptBoolean;
    isTelevision: ScriptBoolean;
    maxChannel: ScriptInt;
    micRange: ScriptInt;
    minChannel: ScriptInt;
    noTransmit: ScriptBoolean;
    transmitRange: ScriptInt;
    twoWay: ScriptBoolean;
    usesBattery: ScriptBoolean;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'acceptmediatype':
                this.acceptMediaType = getInt(statement);
                return true;
            case 'basevolumerange':
                this.baseVolumeRange = getInt(statement);
                return true;
            case 'ishightier':
                this.isHighTier = getBoolean(statement);
                return true;
            case 'isportable':
                this.isPortable = getBoolean(statement);
                return true;
            case 'istelevision':
                this.isTelevision = getBoolean(statement);
                return true;
            case 'maxchannel':
                this.maxChannel = getInt(statement);
                return true;
            case 'micrange':
                this.micRange = getInt(statement);
                return true;
            case 'minchannel':
                this.minChannel = getInt(statement);
                return true;
            case 'notransmit':
                this.noTransmit = getBoolean(statement);
                return true;
            case 'transmitrange':
                this.transmitRange = getInt(statement);
                return true;
            case 'twoway':
                this.twoWay = getBoolean(statement);
                return true;
            case 'usesbattery':
                this.usesBattery = getBoolean(statement);
                return true;
        }
        return super.onStatement(statement);
    }

    allowCustomProperties(): boolean {
        return true;
    }

    getType(): String {
        return 'Radio';
    }
}
