import { getString, Script, ScriptString } from '../Script';
import { ParseBag } from '../../Parser';

export class VehicleLua extends Script {
    checkEngine: ScriptString;
    checkOperate: ScriptString;
    create: ScriptString;
    init: ScriptString;
    update: ScriptString;
    use: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'checkengine':
                this.checkEngine = getString(value);
                return true;
            case 'checkoperate':
                this.checkOperate = getString(value);
                return true;
            case 'create':
                this.create = getString(value);
                return true;
            case 'init':
                this.init = getString(value);
                return true;
            case 'update':
                this.update = getString(value);
                return true;
            case 'use':
                this.use = getString(value);
                return true;
        }
        return false;
    }
}
