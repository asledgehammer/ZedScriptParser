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
    alarmSound: ScriptString;
    alcohol: ScriptBoolean;
    alcoholPower: ScriptFloat;
    ammoType: ScriptString;
    attachmentReplacement: ScriptString;
    attachmentsProvided: ScriptStringArray;
    attachmentType: ScriptString;
    bandagePower: ScriptFloat;
    bloodLocation: ScriptBloodClothingTypes;
    bodyLocation: ScriptString;
    boredomChange: ScriptInt;
    brakeForce: ScriptInt;
    breakSound: ScriptString;
    canBeRemote: ScriptBoolean;
    canHaveHoles: ScriptBoolean;
    canStack: ScriptBoolean;
    canStoreWater: ScriptBoolean;
    chanceToSpawnDamaged: ScriptInt;
    closeKillMove: ScriptString;
    clothingExtraSubmenu: ScriptString;
    clothingItem: ScriptString;
    clothingItemExtra: ScriptString;
    clothingItemExtraOption: ScriptString;
    colorBlue: ScriptInt;
    colorGreen: ScriptInt;
    colorRed: ScriptInt;
    conditionLowerNormal: ScriptFloat;
    conditionLowerOffroad: ScriptFloat;
    conditionMax: ScriptInt;
    count: ScriptInt;
    countDownSound: ScriptString;
    customContextMenu: ScriptString;
    customEatSound: ScriptString;
    disappearOnUse: ScriptBoolean;
    displayCategory: ScriptString;
    displayName: ScriptString;
    eatType: ScriptString;
    engineLoudness: ScriptFloat;
    evolvedRecipeName: ScriptString;
    explosionSound: ScriptString;
    fabricType: ScriptString;
    fatigueChange: ScriptFloat;
    fishingLure: ScriptBoolean;
    foodType: ScriptString;
    gunType: ScriptString;
    icon: ScriptString;
    iconsForTexture: ScriptStringArray;
    isCookable: ScriptBoolean;
    isWaterSource: ScriptBoolean;
    itemWhenDry: ScriptString;
    keepOnDeplete: ScriptBoolean;
    lightDistance: ScriptInt;
    lightStrength: ScriptFloat;
    maxAmmo: ScriptInt;
    medical: ScriptBoolean;
    metalValue: ScriptFloat;
    onCreate: ScriptString;
    obsolete: ScriptBoolean;
    poison: ScriptBoolean;
    poisonDetectionLevel: ScriptInt;
    primaryAnimMask: ScriptString;
    rainFactor: ScriptFloat;
    reduceInfectionPower: ScriptFloat;
    remoteController: ScriptBoolean;
    remoteRange: ScriptInt;
    replaceOnUse: ScriptString;
    replaceOnUseOn: ScriptString;
    requireInHandOrInventory: ScriptStringArray;
    replaceInPrimaryHand: ScriptStringArray;
    replaceInSecondHand: ScriptStringArray;
    requiresEquippedBothHands: ScriptBoolean;
    runSpeedModifier: ScriptFloat;
    scaleWorldIcon: ScriptFloat;
    secondaryAnimMask: ScriptString;
    soundRadius: ScriptInt;
    staticModel: ScriptString;
    stressChange: ScriptInt;
    survivalGear: ScriptBoolean;
    suspensionCompression: ScriptFloat;
    suspensionDamping: ScriptFloat;
    swingAnim: ScriptString;
    tags: ScriptStringArray;
    tooltip: ScriptString;
    torchCone: ScriptBoolean;
    torchDot: ScriptFloat;
    unhappyChange: ScriptInt;
    useDelta: ScriptFloat;
    useWhileEquipped: ScriptBoolean;
    useWorldItem: ScriptBoolean;
    weight: ScriptFloat;
    weightEmpty: ScriptFloat;
    wet: ScriptBoolean;
    wetCooldown: ScriptFloat;
    wheelFriction: ScriptFloat;
    worldObjectSprite: ScriptString;
    worldStaticModel: ScriptString;

    type: String = this.getType();

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'activateditem':
                this.activatedItem = getBoolean(statement);
                return true;
            case 'alarmsound':
                this.alarmSound = getString(statement);
                return true;
            case 'alcohol':
                this.alcohol = getBoolean(statement);
                return true;
            case 'alcoholpower':
                this.alcoholPower = getFloat(statement);
                return true;
            case 'bodylocation':
                this.bodyLocation = getString(statement);
                return true;
            case 'boredomchange':
                this.boredomChange = getInt(statement);
                return true;
            case 'canhaveholes':
                this.canHaveHoles = getBoolean(statement);
                return true;

            case 'clothingextrasubmenu':
                this.clothingExtraSubmenu = getString(statement);
                return true;
            case 'clothingitem':
                this.clothingItem = getString(statement);
                return true;
            case 'clothingitemextra':
                this.clothingItemExtra = getString(statement);
                return true;
            case 'clothingitemextraoption':
                this.clothingItemExtraOption = getString(statement);
                return true;
            case 'conditionmax':
                this.conditionMax = getInt(statement);
                return true;
            case 'count':
                this.count = getInt(statement);
                return true;
            case 'customeatsound':
                this.customEatSound = getString(statement);
                return true;
            case 'disappearonuse':
                this.disappearOnUse = getBoolean(statement);
                return true;
            case 'displayname':
                this.displayName = getString(statement);
                return true;
            case 'eattype':
                this.eatType = getString(statement);
                return true;
            case 'fabrictype':
                this.fabricType = getString(statement);
                return true;
            case 'fishinglure':
                this.fishingLure = getBoolean(statement);
                return true;
            case 'iscookable':
                this.isCookable = getBoolean(statement);
                return true;
            case 'lightdistance':
                this.lightDistance = getInt(statement);
                return true;
            case 'lightstrength':
                this.lightStrength = getFloat(statement);
                return true;
            case 'medical':
                this.medical = getBoolean(statement);
                return true;
            case 'oncreate':
                this.onCreate = getString(statement);
                return true;
            case 'primaryanimmask':
                this.primaryAnimMask = getString(statement);
                return true;
            case 'runspeedmodifier':
                this.runSpeedModifier = getFloat(statement);
                return true;
            case 'scaleworldicon':
                this.scaleWorldIcon = getFloat(statement);
                return true;
            case 'secondaryanimmask':
                this.secondaryAnimMask = getString(statement);
                return true;
            case 'soundradius':
                this.soundRadius = getInt(statement);
                return true;
            case 'stresschange':
                this.stressChange = getInt(statement);
                return true;
            case 'torchcone':
                this.torchCone = getBoolean(statement);
                return true;
            case 'torchdot':
                this.torchDot = getFloat(statement);
                return true;
            case 'unhappychange':
                this.unhappyChange = getInt(statement);
                return true;
            case 'useworlditem':
                this.useWorldItem = getBoolean(statement);
                return true;
            case 'replaceonuseon':
                this.replaceOnUseOn = getString(statement);
                return true;
            case 'requireinhandorinventory':
                this.requireInHandOrInventory =
                    getString(statement)?.split('/');
                return true;
            case 'replaceinprimaryhand':
                this.replaceInPrimaryHand = getString(statement)?.split(' ');
                return true;
            case 'replaceinsecondhand':
                this.replaceInSecondHand = getString(statement)?.split(' ');
                return true;
            case 'usedelta':
                this.useDelta = getFloat(statement);
                return true;
            case 'usewhileequipped':
                this.useWhileEquipped = getBoolean(statement);
                return true;
            case 'weight':
                this.weight = getFloat(statement);
                return true;
            case 'weightempty':
                this.weightEmpty = getFloat(statement);
                return true;
            case 'worldobjectsprite':
                this.worldStaticModel = getString(statement);
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
