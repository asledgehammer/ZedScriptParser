import { getBoolean, getString, Script, ScriptBoolean, ScriptString } from '../Script';
import { ParseBag } from '../../Parser';
import { VehiclePosition } from './VehiclePosition';
import { VehicleSwitchSeat } from './VehicleSwitchSeat';
import { VehicleAnim } from './VehicleAnim';

export class VehiclePassenger extends Script {
    anims: VehicleAnim[] | undefined;
    area: ScriptString;
    door: ScriptString;
    door2: ScriptString;
    hasRoof: ScriptBoolean;
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
            case 'area': 
                this.area = getString(value);
                return true;
            case 'door': 
                this.door = getString(value);
                return true;
            case 'door2': 
                this.door2 = getString(value);
                return true;
            case 'hasroof':
                this.hasRoof = getBoolean(value);
                return true;
        }
        return false;
    }
}
