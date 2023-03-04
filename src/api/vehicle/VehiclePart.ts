import { ParseBag } from 'Parser';
import {
    getBoolean,
    getString,
    Script,
    ScriptBoolean,
    ScriptString,
} from '../Script';
import { VehicleAnim } from './VehicleAnim';
import { VehicleContainer } from './VehicleContainer';
import { VehicleDoor } from './VehicleDoor';
import { VehicleInstall } from './VehicleInstall';
import { VehicleLua } from './VehicleLua';
import { VehiclePassenger } from './VehiclePassenger';
import { VehicleTable } from './VehicleTable';
import { VehicleUninstall } from './VehicleUninstall';
import { VehicleWindow } from './VehicleWindow';

export class VehiclePart extends Script {
    anims: VehicleAnim[] | undefined;
    area: ScriptString;
    category: ScriptString;
    containers: VehicleContainer[] | undefined;
    doors: VehicleDoor[] | undefined;
    itemType: ScriptString;
    lua: VehicleLua | undefined;
    mechanicRequireKey: ScriptBoolean;
    passengers: VehiclePassenger[] | undefined;
    tables: VehicleTable[] | undefined;
    windows: VehicleWindow[] | undefined;

    install: VehicleInstall | undefined;
    uninstall: VehicleUninstall | undefined;

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
            case 'container':
                if (this.containers === undefined) this.containers = [];
                this.containers.push(new VehicleContainer(bag));
                return true;
            case 'door':
                if (this.doors === undefined) this.doors = [];
                this.doors.push(new VehicleDoor(bag));
                return true;
            case 'install':
                this.install = new VehicleInstall(bag);
                return true;
            case 'passenger':
                if (this.passengers === undefined) this.passengers = [];
                this.passengers.push(new VehiclePassenger(bag));
                return true;
            case 'table':
                if (this.tables === undefined) this.tables = [];
                this.tables.push(new VehicleTable(bag));
                return true;
            case 'lua':
                this.lua = new VehicleLua(bag);
                return true;
            case 'uninstall':
                this.uninstall = new VehicleUninstall(bag);
                return true;
            case 'window':
                if (this.windows === undefined) this.windows = [];
                this.windows.push(new VehicleWindow(bag));
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'area':
                this.area = getString(value);
                return true;
            case 'itemtype':
                this.itemType = getString(value);
                return true;
            case 'mechanicrequirekey':
                this.mechanicRequireKey = getBoolean(value);
                return true;
            case 'category':
                this.category = getString(value);
                return true;
        }
        return false;
    }
}