import { ParseBag } from '../../Parser';
import { Script } from '../Script';
import { VehicleEngineData } from './VehicleEngineData';

export class VehicleEngineRPMScript extends Script {
    data: VehicleEngineData[] | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
            case 'data':
                if (this.data === undefined) this.data = [];
                this.data.push(new VehicleEngineData(bag));
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
