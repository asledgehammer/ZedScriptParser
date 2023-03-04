import {
    getFloat,
    getInt,
    getString,
    Script,
    ScriptFloat,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
    ScriptVector3,
} from '../Script';
import { ParseBag } from '../../Parser';
import { VehicleModel } from './VehicleModel';
import { VehicleSkin } from './VehicleSkin';
import { Attachment } from '../Attachment';
import { VehicleLightBar } from './VehicleLightBar';
import { VehicleWheel } from './VehicleWheel';
import { VehiclePassenger } from './VehiclePassenger';
import { VehicleSound } from './VehicleSound';
import { VehicleArea } from './VehicleArea';
import { VehiclePart } from './VehiclePart';
import { VehiclePhysics } from './VehiclePhysics';

export class VehicleScript extends Script {
    areas: VehicleArea[] | undefined;
    attachments: Attachment[] | undefined;
    brakingForce: ScriptInt;
    centerOfMassOffset: ScriptVector3;
    engineForce: ScriptInt;
    engineLoudness: ScriptInt;
    engineQuality: ScriptInt;
    engineRepairLevel: ScriptInt;
    extents: ScriptVector3;
    frontEndHealth: ScriptInt;
    lightBar: VehicleLightBar | undefined;
    mass: ScriptFloat;
    maxSpeed: ScriptFloat;
    maxSuspensionTravelCm: ScriptInt;
    mechanicType: ScriptInt;
    model: VehicleModel | undefined;
    parts: VehiclePart[] | undefined;
    passengers: VehiclePassenger[] | undefined;
    playerDamageProtection: ScriptFloat;
    physicsChassisShape: ScriptVector3;
    physics: VehiclePhysics[] | undefined;
    rearEndHealth: ScriptInt;
    rollInfluence: ScriptFloat;
    seats: ScriptInt;
    skin: VehicleSkin | undefined;
    sound: VehicleSound | undefined;
    spawnOffsetY: ScriptFloat;
    steeringIncrement: ScriptFloat;
    steeringClamp: ScriptFloat;
    stoppingMovementForce: ScriptFloat;
    suspensionStiffness: ScriptInt;
    suspensionCompression: ScriptFloat;
    suspensionDamping: ScriptFloat;
    suspensionRestLength: ScriptFloat;

    'template!': ScriptString;
    templates: ScriptStringArray;

    textureDamage1Overlay: ScriptString;
    textureDamage1Shell: ScriptString;
    textureDamage2Overlay: ScriptString;
    textureDamage2Shell: ScriptString;
    textureLights: ScriptString;
    textureMask: ScriptString;
    textureRust: ScriptString;

    wheelFriction: ScriptFloat;
    wheels: VehicleWheel[] | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.trim().toLowerCase()) {
            case 'area':
                if (this.areas === undefined) this.areas = [];
                this.areas.push(new VehicleArea(bag));
                return true;
            case 'attachment':
                if (this.attachments === undefined) this.attachments = [];
                this.attachments.push(new Attachment(bag));
                return true;
            case 'lightbar':
                this.lightBar = new VehicleLightBar(bag);
                return true;
            case 'model':
                this.model = new VehicleModel(bag);
                return true;
            case 'part':
                if (this.parts === undefined) this.parts = [];
                this.parts.push(new VehiclePart(bag));
                return true;
            case 'passenger':
                if (this.passengers === undefined) this.passengers = [];
                this.passengers.push(new VehiclePassenger(bag));
                return true;
            case 'physics':
                if (this.physics === undefined) this.physics = [];
                this.physics.push(new VehiclePhysics(bag));
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
            case 'brakingforce':
                this.brakingForce = getInt(value);
                return true;
            case 'centerofmassoffset': {
                const [x, y, z] = getString(value)
                    .trim()
                    .split(' ')
                    .map((o) => {
                        return getFloat(o);
                    });
                this.centerOfMassOffset = { x, y, z };
                return true;
            }
            case 'engineforce':
                this.engineForce = getInt(value);
                return true;
            case 'engineloudness':
                this.engineLoudness = getInt(value);
                return true;
            case 'enginequality':
                this.engineQuality = getInt(value);
                return true;
            case 'enginerepairlevel':
                this.engineRepairLevel = getInt(value);
                return true;
            case 'extents': {
                const [x, y, z] = getString(value)
                    .trim()
                    .split(' ')
                    .map((o) => {
                        return getFloat(o);
                    });
                this.extents = { x, y, z };
                return true;
            }
            case 'frontendhealth':
                this.frontEndHealth = getInt(value);
                return true;
            case 'mass': {
                this.mass = getInt(value);
                return true;
            }
            case 'maxspeed':
                this.maxSpeed = getFloat(value);
                return true;
            case 'maxsuspensiontravelcm':
                this.maxSuspensionTravelCm = getInt(value);
                return true;
            case 'mechanictype':
                this.mechanicType = getInt(value);
                return true;
            case 'playerdamageprotection':
                this.playerDamageProtection = getFloat(value);
                return true;
            case 'physicschassisshape': {
                const [x, y, z] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.physicsChassisShape = { x, y, z };
                return true;
            }
            case 'rearendhealth':
                this.rearEndHealth = getInt(value);
                return true;
            case 'rollinfluence':
                this.rollInfluence = getFloat(value);
                return true;
            case 'seats':
                this.seats = getInt(value);
                return true;
            case 'spawnoffsety': {
                this.spawnOffsetY = getFloat(value);
                return true;
            }
            case 'stoppingmovementforce':
                this.stoppingMovementForce = getFloat(value);
                return true;

            case 'steeringincrement':
                this.steeringIncrement = getFloat(value);
                return true;
            case 'steeringclamp':
                this.steeringClamp = getFloat(value);
                return true;
            case 'suspensionstiffness':
                this.suspensionStiffness = getInt(value);
                return true;
            case 'suspensioncompression':
                this.suspensionCompression = getFloat(value);
                return true;
            case 'suspensiondamping':
                this.suspensionDamping = getFloat(value);
                return true;
            case 'suspensionrestlength':
                this.suspensionRestLength = getFloat(value);
                return true;

            case 'template':
                if (this.templates == null) this.templates = [];
                this.templates.push(getString(value));
                return true;
            case 'template!':
                this['template!'] = getString(value);
                return true;
            case 'texturedamage1overlay':
                this.textureDamage1Overlay = getString(value);
                return true;
            case 'texturedamage1shell':
                this.textureDamage1Shell = getString(value);
                return true;
            case 'texturedamage2overlay':
                this.textureDamage2Overlay = getString(value);
                return true;
            case 'texturedamage2shell':
                this.textureDamage2Shell = getString(value);
                return true;
            case 'texturelights':
                this.textureLights = getString(value);
                return true;
            case 'texturemask':
                this.textureMask = getString(value);
                return true;
            case 'texturerust':
                this.textureRust = getString(value);
                return true;
            case 'wheelfriction':
                this.wheelFriction = getFloat(value);
                return true;
        }
        return false;
    }
}
