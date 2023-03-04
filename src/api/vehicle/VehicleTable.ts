import { getInt, getString, Script, ScriptInt, ScriptString } from "../Script";
import { ParseBag } from "../../Parser";
import { VehicleItems } from "./VehicleItems";
import { VehicleItem } from "./VehicleItem";

export class VehicleTable extends Script {
    door: ScriptString;
    items: VehicleItem[] | undefined;
    professions: ScriptString;
    recipes: ScriptString;
    skills: ScriptString;
    test: ScriptString;
    time: ScriptInt;
    traits: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'items':
                this.items = new VehicleItems(bag).items;
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch(property.toLowerCase().trim()) {
            case 'door':
                this.door = getString(value);
                return true;
            case 'professions':
                this.professions = getString(value);
                return true;
            case 'recipes':
                this.recipes = getString(value);
                return true;
            case 'skills':
                this.skills = getString(value);
                return true;
            case 'test':
                this.test = getString(value);
                return true;
            case 'time':
                this.time = getInt(value);
                return true;
            case 'traits':
                this.traits = getString(value);
                return true;
        }
        return false;
    }
}