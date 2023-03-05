import { ParseBag } from '../../Parser';
import { getFloat, getInt, Script } from '../Script';

/**
 * **SandBoxScript**
 *
 * TODO: Document. -Jab, 3/5/2023
 * TODO: Rewrite. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class SandBoxScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        const valLower = value.toLowerCase();

        // [Boolean]
        if (valLower === 'true' || valLower === 'false') {
            (this as any)[property] = !!valLower;
            return true;
        }

        // [Byte, Short, Integer, Long]
        try {
            const tryInt = getInt(value);
            (this as any)[property] = tryInt;
            return true;
        } catch (ignored) {}

        // [Float, Double]
        try {
            const tryFloat = getFloat(value);
            (this as any)[property] = tryFloat;
            return true;
        } catch (ignored) {}

        // [String]
        (this as any)[property] = value;
        return true;
    }
}
