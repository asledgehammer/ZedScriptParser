import { ParseBag } from "../../Parser";
import { Script } from "../Script";
import { VehicleItem } from "./VehicleItem";

export class VehicleItems extends Script {

    items: VehicleItem[] | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=', false, true);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        if(this.items === undefined) this.items = [];
        this.items.push(new VehicleItem(bag, property));
        return true;
    }

    onPropertyValue(property: string, value: string): boolean {
        return false;
    }
}