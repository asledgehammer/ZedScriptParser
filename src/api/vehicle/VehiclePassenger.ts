import { Script } from '../Script';
import { ParseBag } from '../../Parser';
import { VehiclePosition } from './VehiclePosition';
import { VehicleSwitchSeat } from './VehicleSwitchSeat';
import { VehicleAnim } from './VehicleAnim';

export class VehiclePassenger extends Script {
    anims: VehicleAnim[] | undefined;
    positions: VehiclePosition[] | undefined;
    switchSeats: VehicleSwitchSeat[] | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'anim':
                if (this.anims === undefined) this.anims = [];
                this.anims.push(new VehicleAnim(bag));
                return true;
            case 'position':
                if (this.positions === undefined) this.positions = [];
                this.positions.push(new VehiclePosition(bag));
                return true;
            case 'switchseat':
                if (this.switchSeats === undefined) this.switchSeats = [];
                this.switchSeats.push(new VehicleSwitchSeat(bag));
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
        }
        return false;
    }
}
