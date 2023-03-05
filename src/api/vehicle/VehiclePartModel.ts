import { ParseBag } from '../../Parser';
import { getFloat, getString, getURI, Script, ScriptFloat, ScriptString, ScriptVector3 } from '../Script';

export class VehiclePartModel extends Script {
    
    file: ScriptString;
    offset: ScriptVector3;
    rotate: ScriptVector3;
    scale: ScriptFloat;
    
    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyValue(property: string, value: string): boolean {
        switch(property.toLowerCase()) {
            case 'file':
                this.file = getURI(value);
                return true;
            case 'scale':
                this.scale = getFloat(value);
                return true;
            case 'offset': {
                const [x, y, z] = getString(value).split(' ').map(o=>{ return getFloat(o.trim())});
                this.offset = {x, y, z};
                return true;
            }
            case 'rotate': {
                const [x, y, z] = getString(value).split(' ').map(o=>{ return getFloat(o.trim())});
                this.rotate = {x, y, z};
                return true;
            }
        }
        return false;
    }
}
