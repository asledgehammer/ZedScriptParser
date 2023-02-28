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
import { VehicleLightBar } from './VehicleLightBar';
import { VehicleWheel } from './VehicleWheel';
import { VehiclePassenger } from './VehiclePassenger';
import { VehicleSound } from './VehicleSound';
import { VehicleArea } from './VehicleArea';
import { VehiclePart } from './VehiclePart';
import { VehicleInstall } from './VehicleInstall';
import { VehicleUninstall } from './VehicleUninstall';

export class VehicleScript extends Script {
    areas: VehicleArea[] | undefined;
    attachments: Attachment[] | undefined;
    centerOfMassOffset: ScriptVector3;
    extents: ScriptVector3;
    lightBar: VehicleLightBar | undefined;
    mass: ScriptFloat;
    model: VehicleModel | undefined;
    parts: VehiclePart[] | undefined;
    passengers: VehiclePassenger[] | undefined;
    physicsChassisShape: ScriptVector3;
    skin: VehicleSkin | undefined;
    sound: VehicleSound | undefined;
    spawnOffsetY: ScriptFloat;
    wheels: VehicleWheel[] | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.trim().toLowerCase()) {
            case 'area':
                if (this.areas === undefined) this.areas = [];
                this.areas.push(new VehicleArea(bag));
                return true;
            case 'attachment':
                if (this.attachments === undefined) this.attachments = [];
                this.attachments.push(new Attachment(bag));
                return true;
            case 'lightbar':
                this.lightBar = new VehicleLightBar(bag);
                return true;
            case 'model':
                this.model = new VehicleModel(bag);
                return true;
            case 'part':
                if (this.parts === undefined) this.parts = [];
                this.parts.push(new VehiclePart(bag));
                return true;
            case 'passenger':
                if (this.passengers === undefined) this.passengers = [];
                this.passengers.push(new VehiclePassenger(bag));
                return true;
            case 'skin':
                this.skin = new VehicleSkin(bag);
                return true;
            case 'sound':
                this.sound = new VehicleSound(bag);
                return true;
            case 'wheel':
                if (this.wheels === undefined) this.wheels = [];
                this.wheels.push(new VehicleWheel(bag));
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
