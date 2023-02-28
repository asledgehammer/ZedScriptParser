import {
    getFloat,
    getInt,
    getString,
    Script,
    ScriptFloat,
    ScriptInt,
    ScriptVector3,
} from '../Script';
import { ParseBag } from '../../Parser';
import { VehicleModel } from './VehicleModel';
import { VehicleSkin } from './VehicleSkin';
import { Attachment } from '../Attachment';

export class VehicleScript extends Script {
    attachments: Attachment[] | undefined;
    centerOfMassOffset: ScriptVector3;
    extents: ScriptVector3;
    mass: ScriptFloat;
    model: VehicleModel | undefined;
    physicsChassisShape: ScriptVector3;
    skin: VehicleSkin | undefined;
    spawnOffsetY: ScriptFloat;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.trim().toLowerCase()) {
            case 'attachment':
                if (this.attachments === undefined) this.attachments = [];
                this.attachments.push(new Attachment(bag));
                return true;
            case 'model':
                this.model = new VehicleModel(bag);
                return true;
            case 'skin':
                this.skin = new VehicleSkin(bag);
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'centerofmassoffset': {
                const [x, y, z] = getString(value)
                    .trim()
                    .split(' ')
                    .map((o) => {
                        return getFloat(o);
                    });
                this.centerOfMassOffset = { x, y, z };
                return true;
            }
            case 'extents': {
                const [x, y, z] = getString(value)
                    .trim()
                    .split(' ')
                    .map((o) => {
                        return getFloat(o);
                    });
                this.extents = { x, y, z };
                return true;
            }
            case 'mass': {
                this.mass = getInt(value);
                return true;
            }
            case 'physicschassisshape': {
                const [x, y, z] = getString(value)
                    .trim()
                    .split(' ')
                    .map((o) => {
                        return getFloat(o);
                    });
                this.physicsChassisShape = { x, y, z };

                return true;
            }
            case 'spawnoffsety': {
                this.spawnOffsetY = getFloat(value);
                return true;
            }
        }
        return false;
    }
}
