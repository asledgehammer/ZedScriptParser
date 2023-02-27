import { Script } from '../Script';
import { ParseBag } from '../../Parser';
import { VehicleModel } from './VehicleModel';
import { VehicleSkin } from './VehicleSkin';
import { Attachment } from '../Attachment';

export class VehicleScript extends Script {
    attachments: Attachment[] | undefined;
    model: VehicleModel | undefined;
    skin: VehicleSkin | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        console.log({ property });
        switch (property.trim().toLowerCase()) {
            case 'model':
                this.model = new VehicleModel(bag);
                return true;
            case 'skin':
                this.skin = new VehicleSkin(bag);
                return true;
            case 'attachment':
                if (this.attachments === undefined) this.attachments = [];
                this.attachments.push(new Attachment(bag));
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
