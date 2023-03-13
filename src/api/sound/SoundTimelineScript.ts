import { ParseBag } from '../util/ParseBag';
import { getInt, Script, ScriptInt } from '../Script';

/**
 * **SoundTimelineScript**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class SoundTimelineScript extends Script {
    idle: ScriptInt;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyValue(property: string, value: string): boolean {
        property = property.trim();
        value = value.trim();
        switch (property.toLowerCase()) {
            case 'idle':
                this.idle = getInt(value);
                return true;
        }
        return false;
    }

    get label(): string {
        return 'soundtimeline';
    }
}
