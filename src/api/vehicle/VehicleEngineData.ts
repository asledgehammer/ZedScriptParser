import { Script } from '../Script';
import { ParseBag } from '../../Parser';

/**
 * **VehicleEngineData**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class VehicleEngineData extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=', false, true);

        this.parse(bag);
    }
}
