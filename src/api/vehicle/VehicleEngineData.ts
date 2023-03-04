import { Script } from "../Script";
import { ParseBag } from "../../Parser";

export class VehicleEngineData extends Script {

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);

        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        return false;
    }
}