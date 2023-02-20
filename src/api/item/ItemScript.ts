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

export abstract class ItemScript extends ScriptObject {
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
    brakeForce: ScriptInt;
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
    displayName: ScriptString;
    engineLoudness: ScriptFloat;
    evolvedRecipeName: ScriptString;
    explosionSound: ScriptString;
    fatigueChange: ScriptFloat;
    foodType: ScriptString;
    gunType: ScriptString;
    icon: ScriptString;
    iconsForTexture: ScriptStringArray;
    isWaterSource: ScriptBoolean;
    itemWhenDry: ScriptString;
    keepOnDeplete: ScriptBoolean;
    lightDistance: ScriptInt;
    lightStrength: ScriptFloat;
    maxAmmo: ScriptInt;
    metalValue: ScriptFloat;
    obsolete: ScriptBoolean;
    poison: ScriptBoolean;
    poisonDetectionLevel: ScriptInt;
    rainFactor: ScriptFloat;
    reduceInfectionPower: ScriptFloat;
    remoteController: ScriptBoolean;
    remoteRange: ScriptInt;
    replaceOnUse: ScriptString;
    replaceOnUseOn: ScriptString;
    requireInHandOrInventory: ScriptStringArray;
    requiresEquippedBothHands: ScriptBoolean;
    staticModel: ScriptString;
    stressChange: ScriptInt;
    survivalGear: ScriptBoolean;
    suspensionCompression: ScriptFloat;
    suspensionDamping: ScriptFloat;
    swingAnim: ScriptString;
    tags: ScriptStringArray;
    tooltip: ScriptString;
    torchCone: ScriptBoolean;
    unhappyChange: ScriptInt;
    weight: ScriptFloat;
    wet: ScriptBoolean;
    wetCooldown: ScriptFloat;
    wheelFriction: ScriptFloat;
    worldStaticModel: ScriptString;

    type: String = this.getType();

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'activateditem':
                this.activatedItem = getBoolean(statement);
                return true;
            case 'alcohol':
                this.alcoholic = getBoolean(statement);
                return true;
            case 'alcoholpower':
                this.alcoholPower = getFloat(statement);
                return true;
            case 'boredomchange':
                this.boredomChange = getInt(statement);
                return true;
            case 'conditionmax':
                this.conditionMax = getInt(statement);
                return true;
            case 'count':
                this.count = getInt(statement);
                return true;
            case 'displayname':
                this.displayName = getString(statement);
                return true;
            case 'lightstrength':
                this.lightStrength = getFloat(statement);
                return true;
            case 'stresschange':
                this.stressChange = getInt(statement);
                return true;
            case 'torchcone':
                this.torchCone = getBoolean(statement);
                return true;
            case 'lightdistance':
                this.lightDistance = getInt(statement);
                return true;
            case 'unhappychange':
                this.unhappyChange = getInt(statement);
                return true;
            case 'weight':
                this.weight = getFloat(statement);
                return true;
            case 'replaceonuseon':
                this.replaceOnUseOn = getString(statement);
                return true;
            case 'requireinhandorinventory':
                this.requireInHandOrInventory =
                    getString(statement)?.split('/');
                return true;
            case 'attachmentsprovided':
                this.attachmentsProvided = getString(statement)?.split(';');
                return true;
            case 'attachmentreplacement':
                this.attachmentReplacement = getString(statement);
                return true;
            case 'iswatersource':
                this.isWaterSource = getBoolean(statement);
                return true;
            case 'canstorewater':
                this.canStoreWater = getBoolean(statement);
                return true;
            case 'canstack':
                this.canStack = getBoolean(statement);
                return true;
            case 'poison':
                this.poison = getBoolean(statement);
                return true;
            case 'foodtype':
                this.foodType = getString(statement);
                return true;
            case 'fatiguechange':
                this.fatigueChange = getFloat(statement); // fatigueChange /= 100 in PZ.
                return true;
            case 'posiondetectionlevel':
                this.poisonDetectionLevel = getInt(statement);
                return true;
            case 'tooltip':
                this.tooltip = getString(statement);
                return true;
            case 'displaycategory':
                this.displayCategory = getString(statement);
                return true;
            case 'requiresequippedbothhands':
                this.requiresEquippedBothHands = getBoolean(statement);
                return true;
            case 'breaksound':
                this.breakSound = getString(statement);
                return true;
            case 'replaceonuse':
                this.replaceOnUse = getString(statement);
                return true;
            case 'bandagepower':
                this.bandagePower = getFloat(statement);
                return true;
            case 'reduceinfectionpower':
                this.reduceInfectionPower = getFloat(statement);
                return true;
            case 'canberemote':
                this.canBeRemote = getBoolean(statement);
                return true;
            case 'remotecontroller':
                this.remoteController = getBoolean(statement);
                return true;
            case 'remoterange':
                this.remoteRange = getInt(statement);
                return true;
            case 'countdownsound':
                this.countDownSound = getString(statement);
                return true;
            case 'explosionsound':
                this.explosionSound = getString(statement);
                return true;
            case 'colorred':
                this.colorRed = getInt(statement);
                return true;
            case 'colorgreen':
                this.colorGreen = getInt(statement);
                return true;
            case 'colorblue':
                this.colorBlue = getInt(statement);
                return true;
            case 'evolvedrecipename':
                this.evolvedRecipeName = getString(statement); // Translator.getItemEvolvedRecipeName()
                return true;
            case 'metalvalue':
                this.metalValue = getFloat(statement);
                return true;
            case 'wet':
                this.wet = getBoolean(statement);
                return true;
            case 'wetcooldown':
                this.wetCooldown = getFloat(statement);
                return true;
            case 'itemwhendry':
                this.itemWhenDry = getString(statement);
                return true;
            case 'keepondeplete':
                this.keepOnDeplete = getBoolean(statement);
                return true;
            case 'brakeforce':
                this.brakeForce = getInt(statement); // Cast to float in PZ.
                return true;
            case 'chancetospawndamaged':
                this.chanceToSpawnDamaged = getInt(statement);
                return true;
            case 'conditionlowernormal':
                this.conditionLowerNormal = getFloat(statement);
                return true;
            case 'conditionloweroffroad':
                this.conditionLowerOffroad = getFloat(statement);
                return true;
            case 'wheelfriction':
                this.wheelFriction = getFloat(statement);
                return true;
            case 'suspensioncompression':
                this.suspensionCompression = getFloat(statement);
                return true;
            case 'engineloudness':
                this.engineLoudness = getFloat(statement);
                return true;
            case 'suspensiondamping':
                this.suspensionDamping = getFloat(statement);
                return true;
            case 'customcontextmenu':
                this.customContextMenu = getString(statement); // ContextMenu_${CustomContextMenu}
                return true;
            case 'iconsfortexture':
                this.iconsForTexture = getString(statement)?.split(';');
                return true;
            case 'bloodlocation':
                this.bloodLocation = getString(statement)?.split(
                    ';',
                ) as BloodClothingType[]; // BloodClothingType[]
                return true;
            case 'closekillmove':
                this.closeKillMove = getString(statement);
                return true;
            case 'ammotype':
                this.ammoType = getString(statement); // PZ code doesn't trim this for some reason..
                return true;
            case 'maxammo':
                this.maxAmmo = getInt(statement);
                return true;
            case 'guntype':
                this.gunType = getString(statement); // PZ code doesn't trim this for some reason..
                return true;
            case 'attachmenttype':
                this.attachmentType = getString(statement);
                return true;
            case 'icon':
                this.icon = getString(statement);
                return true;
            case 'survivalgear':
                this.survivalGear = getBoolean(statement);
                return true;
            case 'swinganim':
                this.swingAnim = getString(statement);
                return true;
            case 'tags':
                this.tags = getString(statement)?.split(';');
                return true;
            case 'type':
                return true;
            case 'worldstaticmodel':
                this.worldStaticModel = getString(statement);
                return true;
            case 'obsolete':
                this.obsolete = getBoolean(statement);
                return true;
            case 'staticmodel':
                this.staticModel = getString(statement);
                return true;
            case 'rainfactor':
                this.rainFactor = getFloat(statement);
                return true;
        }

        return false;
    }

    getType(): String {
        return 'Normal';
    }
}
