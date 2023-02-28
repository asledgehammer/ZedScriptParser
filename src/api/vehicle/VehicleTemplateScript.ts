import { ParseBag } from '../../Parser';
import { Script } from '../Script';
import { VehicleArea } from './VehicleArea';
import { VehicleAttachment } from './VehicleAttachment';
import { VehicleLightBar } from './VehicleLightBar';
import { VehiclePart } from './VehiclePart';
import { VehiclePassenger } from './VehiclePassenger';
import { VehicleSkin } from './VehicleSkin';
import { VehicleSound } from './VehicleSound';
import { VehicleWheel } from './VehicleWheel';

export class VehicleTemplateScript extends Script {
    attachments: VehicleAttachment[] | undefined;
    areas: VehicleArea[] | undefined;
    lightBar: VehicleLightBar | undefined;
    parts: VehiclePart[] | undefined;
    passengers: VehiclePassenger[] | undefined;
    skin: VehicleSkin | undefined;
    sound: VehicleSound | undefined;
    wheels: VehicleWheel[] | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
            case 'area':
                if (this.areas === undefined) this.areas = [];
                this.areas.push(new VehicleArea(bag));
                return true;
            case 'attachment':
                if (this.attachments === undefined) this.attachments = [];
                this.attachments.push(new VehicleAttachment(bag));
                return true;
            case 'lightbar':
                this.lightBar = new VehicleLightBar(bag);
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
        }
        return false;
    }
}
