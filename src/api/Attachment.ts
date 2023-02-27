import { ParseBag } from '../Parser';
import { getString, Script, ScriptVector3 } from './Script';

export class Attachment extends Script {
    offset: ScriptVector3;
    rotate: ScriptVector3;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyValue(property: string, value: string): boolean {
        property = property.trim();
        value = value.trim();
        switch (property.toLowerCase()) {
            case 'offset': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return parseFloat(o);
                    });
                this.offset = { x, y, z };
                return true;
            }
            case 'rotate': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return parseFloat(o);
                    });
                this.rotate = { x, y, z };
                return true;
            }
        }
        return false;
    }
}
