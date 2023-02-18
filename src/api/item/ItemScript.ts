import { AssignmentStatement } from 'ast';
import {
    getBoolean,
    getFloat,
    getInt,
    getString,
    ScriptBoolean,
    ScriptFloat,
    ScriptInt,
    ScriptObject,
    ScriptString,
    ScriptStringArray,
} from '../ScriptObject';
import {
    BloodClothingType,
    ScriptBloodClothingTypes,
} from './BloodClothingType';

export class ItemScript extends ScriptObject {
    activatedItem: ScriptBoolean;
    alcoholic: ScriptBoolean;
    alcoholPower: ScriptFloat;
    ammoType: ScriptString;
    attachmentReplacement: ScriptString;
    attachmentsProvided: ScriptStringArray;
    attachmentType: ScriptString;

    bandagePower: ScriptFloat;
    bloodLocation: ScriptBloodClothingTypes;
    boredomChange: ScriptInt;
    brakeForce: ScriptFloat;
    breakSound: ScriptString;

    canBeRemote: ScriptBoolean;
    canStack: ScriptBoolean;
    canStoreWater: ScriptBoolean;
    chanceToSpawnDamaged: ScriptInt;
    closeKillMove: ScriptString;
    colorBlue: ScriptInt;
    colorGreen: ScriptInt;
    colorRed: ScriptInt;
    conditionLowerNormal: ScriptFloat;
    conditionLowerOffroad: ScriptFloat;
    conditionMax: ScriptInt;
    count: ScriptInt;
    countDownSound: ScriptString;
    customContextMenu: ScriptString;

    displayCategory: ScriptString;

    engineLoudness: ScriptFloat;
    evolvedRecipeName: ScriptString;
    explosionSound: ScriptString;

    fatigueChange: ScriptFloat;
    foodType: ScriptString;

    gunType: ScriptString;

    iconsForTexture: ScriptStringArray;
    isWaterSource: ScriptBoolean;
    itemWhenDry: ScriptString;

    keepOnDeplete: ScriptBoolean;

    lightDistance: ScriptInt;
    lightStrength: ScriptFloat;

    maxAmmo: ScriptInt;
    metalValue: ScriptFloat;

    poison: ScriptBoolean;
    poisonDetectionLevel: ScriptInt;

    reduceInfectionPower: ScriptFloat;
    remoteController: ScriptBoolean;
    remoteRange: ScriptInt;
    replaceOnUse: ScriptString;
    replaceOnUseOn: ScriptString;
    requireInHandOrInventory: ScriptStringArray;
    requiresEquippedBothHands: ScriptBoolean;

    stressChange: ScriptInt;
    suspensionCompression: ScriptFloat;
    suspensionDamping: ScriptFloat;

    tooltip: ScriptString;
    torchCone: ScriptBoolean;

    unhappyChange: ScriptInt;

    weight: ScriptFloat;
    wet: ScriptBoolean;
    wetCooldown: ScriptFloat;
    wheelFriction: ScriptFloat;

    constructor(statement: AssignmentStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'activateditem':
                this.activatedItem = getBoolean(statement);
                break;
            case 'alcohol':
                this.alcoholic = getBoolean(statement);
                break;
            case 'alcoholpower':
                this.alcoholPower = getFloat(statement);
                break;
            case 'boredomchange':
                this.boredomChange = getInt(statement);
                break;
            case 'conditionmax':
                this.conditionMax = getInt(statement);
                break;
            case 'count':
                this.count = getInt(statement);
                break;
            case 'lightstrength':
                this.lightStrength = getFloat(statement);
                break;
            case 'stresschange':
                this.stressChange = getInt(statement);
                break;
            case 'torchcone':
                this.torchCone = getBoolean(statement);
                break;
            case 'lightdistance':
                this.lightDistance = getInt(statement);
                break;
            case 'unhappychange':
                this.unhappyChange = getInt(statement);
                break;
            case 'weight':
                this.weight = getFloat(statement);
                break;
            case 'replaceonuseon':
                this.replaceOnUseOn = getString(statement);
                break;
            case 'requireinhandorinventory':
                this.requireInHandOrInventory =
                    getString(statement)?.split('/');
                break;
            case 'attachmentsprovided':
                this.attachmentsProvided = getString(statement)?.split(';');
                break;
            case 'attachmentreplacement':
                this.attachmentReplacement = getString(statement);
                break;
            case 'iswatersource':
                this.isWaterSource = getBoolean(statement);
                break;
            case 'canstorewater':
                this.canStoreWater = getBoolean(statement);
                break;
            case 'canstack':
                this.canStack = getBoolean(statement);
                break;
            case 'poison':
                this.poison = getBoolean(statement);
                break;
            case 'foodtype':
                this.foodType = getString(statement);
                break;
            case 'fatiguechange':
                this.fatigueChange = getFloat(statement); // fatigueChange /= 100 in PZ.
                break;
            case 'posiondetectionlevel':
                this.poisonDetectionLevel = getInt(statement);
                break;
            case 'tooltip':
                this.tooltip = getString(statement);
                break;
            case 'displaycategory':
                this.displayCategory = getString(statement);
                break;
            case 'requiresequippedbothhands':
                this.requiresEquippedBothHands = getBoolean(statement);
                break;
            case 'breaksound':
                this.breakSound = getString(statement);
                break;
            case 'replaceonuse':
                this.replaceOnUse = getString(statement);
                break;
            case 'bandagepower':
                this.bandagePower = getFloat(statement);
                break;
            case 'reduceinfectionpower':
                this.reduceInfectionPower = getFloat(statement);
                break;
            case 'canberemote':
                this.canBeRemote = getBoolean(statement);
                break;
            case 'remotecontroller':
                this.remoteController = getBoolean(statement);
                break;
            case 'remoterange':
                this.remoteRange = getInt(statement);
                break;
            case 'countdownsound':
                this.countDownSound = getString(statement);
                break;
            case 'explosionsound':
                this.explosionSound = getString(statement);
                break;
            case 'colorred':
                this.colorRed = getInt(statement);
                break;
            case 'colorgreen':
                this.colorGreen = getInt(statement);
                break;
            case 'colorblue':
                this.colorBlue = getInt(statement);
                break;
            case 'evolvedrecipename':
                this.evolvedRecipeName = getString(statement); // Translator.getItemEvolvedRecipeName()
                break;
            case 'metalvalue':
                this.metalValue = getFloat(statement);
                break;
            case 'wet':
                this.wet = getBoolean(statement);
                break;
            case 'wetcooldown':
                this.wetCooldown = getFloat(statement);
                break;
            case 'itemwhendry':
                this.itemWhenDry = getString(statement);
                break;
            case 'keepondeplete':
                this.keepOnDeplete = getBoolean(statement);
                break;
            case 'brakeforce':
                this.brakeForce = getInt(statement); // Cast to float.
                break;
            case 'chancetospawndamaged':
                this.chanceToSpawnDamaged = getInt(statement);
                break;
            case 'conditionlowernormal':
                this.conditionLowerNormal = getFloat(statement);
                break;
            case 'conditionloweroffroad':
                this.conditionLowerOffroad = getFloat(statement);
                break;
            case 'wheelfriction':
                this.wheelFriction = getFloat(statement);
                break;
            case 'suspensioncompression':
                this.suspensionCompression = getFloat(statement);
                break;
            case 'engineloudness':
                this.engineLoudness = getFloat(statement);
                break;
            case 'suspensiondamping':
                this.suspensionDamping = getFloat(statement);
                break;
            case 'customcontextmenu':
                this.customContextMenu = getString(statement); // ContextMenu_${CustomContextMenu}
                break;
            case 'iconsfortexture':
                this.iconsForTexture = getString(statement)?.split(';');
                break;
            case 'bloodlocation':
                this.bloodLocation = getString(statement)?.split(
                    ';',
                ) as BloodClothingType[]; // BloodClothingType[]
                break;
            case 'closekillmove':
                this.closeKillMove = getString(statement);
                break;
            case 'ammotype':
                this.ammoType = getString(statement); // PZ code doesn't trim this for some reason..
                break;
            case 'maxammo':
                this.maxAmmo = getInt(statement);
                break;
            case 'guntype':
                this.gunType = getString(statement); // PZ code doesn't trim this for some reason..
                break;
            case 'attachmenttype':
                this.attachmentType = getString(statement);
                break;
            default:
                console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }
    }
}
