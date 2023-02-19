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
    customProperties: { [name: string]: any } | undefined = {};

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
    reduceInfectionPower: ScriptFloat;
    remoteController: ScriptBoolean;
    remoteRange: ScriptInt;
    replaceOnUse: ScriptString;
    replaceOnUseOn: ScriptString;
    requireInHandOrInventory: ScriptStringArray;
    requiresEquippedBothHands: ScriptBoolean;
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

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'activateditem':
                this.activatedItem = getBoolean(statement);
                return;
            case 'alcohol':
                this.alcoholic = getBoolean(statement);
                return;
            case 'alcoholpower':
                this.alcoholPower = getFloat(statement);
                return;
            case 'boredomchange':
                this.boredomChange = getInt(statement);
                return;
            case 'conditionmax':
                this.conditionMax = getInt(statement);
                return;
            case 'count':
                this.count = getInt(statement);
                return;
            case 'displayname':
                this.displayName = getString(statement);
                return;
            case 'lightstrength':
                this.lightStrength = getFloat(statement);
                return;
            case 'stresschange':
                this.stressChange = getInt(statement);
                return;
            case 'torchcone':
                this.torchCone = getBoolean(statement);
                return;
            case 'lightdistance':
                this.lightDistance = getInt(statement);
                return;
            case 'unhappychange':
                this.unhappyChange = getInt(statement);
                return;
            case 'weight':
                this.weight = getFloat(statement);
                return;
            case 'replaceonuseon':
                this.replaceOnUseOn = getString(statement);
                return;
            case 'requireinhandorinventory':
                this.requireInHandOrInventory =
                    getString(statement)?.split('/');
                return;
            case 'attachmentsprovided':
                this.attachmentsProvided = getString(statement)?.split(';');
                return;
            case 'attachmentreplacement':
                this.attachmentReplacement = getString(statement);
                return;
            case 'iswatersource':
                this.isWaterSource = getBoolean(statement);
                return;
            case 'canstorewater':
                this.canStoreWater = getBoolean(statement);
                return;
            case 'canstack':
                this.canStack = getBoolean(statement);
                return;
            case 'poison':
                this.poison = getBoolean(statement);
                return;
            case 'foodtype':
                this.foodType = getString(statement);
                return;
            case 'fatiguechange':
                this.fatigueChange = getFloat(statement); // fatigueChange /= 100 in PZ.
                return;
            case 'posiondetectionlevel':
                this.poisonDetectionLevel = getInt(statement);
                return;
            case 'tooltip':
                this.tooltip = getString(statement);
                return;
            case 'displaycategory':
                this.displayCategory = getString(statement);
                return;
            case 'requiresequippedbothhands':
                this.requiresEquippedBothHands = getBoolean(statement);
                return;
            case 'breaksound':
                this.breakSound = getString(statement);
                return;
            case 'replaceonuse':
                this.replaceOnUse = getString(statement);
                return;
            case 'bandagepower':
                this.bandagePower = getFloat(statement);
                return;
            case 'reduceinfectionpower':
                this.reduceInfectionPower = getFloat(statement);
                return;
            case 'canberemote':
                this.canBeRemote = getBoolean(statement);
                return;
            case 'remotecontroller':
                this.remoteController = getBoolean(statement);
                return;
            case 'remoterange':
                this.remoteRange = getInt(statement);
                return;
            case 'countdownsound':
                this.countDownSound = getString(statement);
                return;
            case 'explosionsound':
                this.explosionSound = getString(statement);
                return;
            case 'colorred':
                this.colorRed = getInt(statement);
                return;
            case 'colorgreen':
                this.colorGreen = getInt(statement);
                return;
            case 'colorblue':
                this.colorBlue = getInt(statement);
                return;
            case 'evolvedrecipename':
                this.evolvedRecipeName = getString(statement); // Translator.getItemEvolvedRecipeName()
                return;
            case 'metalvalue':
                this.metalValue = getFloat(statement);
                return;
            case 'wet':
                this.wet = getBoolean(statement);
                return;
            case 'wetcooldown':
                this.wetCooldown = getFloat(statement);
                return;
            case 'itemwhendry':
                this.itemWhenDry = getString(statement);
                return;
            case 'keepondeplete':
                this.keepOnDeplete = getBoolean(statement);
                return;
            case 'brakeforce':
                this.brakeForce = getInt(statement); // Cast to float in PZ.
                return;
            case 'chancetospawndamaged':
                this.chanceToSpawnDamaged = getInt(statement);
                return;
            case 'conditionlowernormal':
                this.conditionLowerNormal = getFloat(statement);
                return;
            case 'conditionloweroffroad':
                this.conditionLowerOffroad = getFloat(statement);
                return;
            case 'wheelfriction':
                this.wheelFriction = getFloat(statement);
                return;
            case 'suspensioncompression':
                this.suspensionCompression = getFloat(statement);
                return;
            case 'engineloudness':
                this.engineLoudness = getFloat(statement);
                return;
            case 'suspensiondamping':
                this.suspensionDamping = getFloat(statement);
                return;
            case 'customcontextmenu':
                this.customContextMenu = getString(statement); // ContextMenu_${CustomContextMenu}
                return;
            case 'iconsfortexture':
                this.iconsForTexture = getString(statement)?.split(';');
                return;
            case 'bloodlocation':
                this.bloodLocation = getString(statement)?.split(
                    ';',
                ) as BloodClothingType[]; // BloodClothingType[]
                return;
            case 'closekillmove':
                this.closeKillMove = getString(statement);
                return;
            case 'ammotype':
                this.ammoType = getString(statement); // PZ code doesn't trim this for some reason..
                return;
            case 'maxammo':
                this.maxAmmo = getInt(statement);
                return;
            case 'guntype':
                this.gunType = getString(statement); // PZ code doesn't trim this for some reason..
                return;
            case 'attachmenttype':
                this.attachmentType = getString(statement);
                return;
            case 'icon':
                this.icon = getString(statement);
                return;
            case 'survivalgear':
                this.survivalGear = getBoolean(statement);
                return;
            case 'swinganim':
                this.swingAnim = getString(statement);
                return;
            case 'tags':
                this.tags = getString(statement)?.split(';');
                return;
            case 'type':
                return;
            case 'worldstaticmodel':
                this.worldStaticModel = getString(statement);
                return;
            case 'obsolete':
                this.obsolete = getBoolean(statement);
                return;
            default:
                if (this.allowCustomProperties()) {
                    this.addCustomProperty(statement);
                }
                return;
        }
    }

    allowCustomProperties() {
        return false;
    }

    addCustomProperty(statement: AssignmentStatement) {
        if (statement.value.type !== 'AssignmentExpression') {
            return;
        }

        const name = statement.id.value;
        let value: any;

        switch (statement.value.value.type) {
            case 'NullLiteral':
                value = null;
                break;
            case 'NumericLiteral':
            case 'BooleanLiteral':
            case 'NumericArrayLiteral':
            case 'StringLiteral':
            case 'StringArrayLiteral':
                value = statement.value.value.value;
        }

        console.log(
            `[${this.__name}] :: Adding custom property: ${name} = ${value}`,
        );
        if (this.customProperties == null) this.customProperties = {};
        this.customProperties[name] = value;
    }

    toJSON(): any {
        let o: any = {};

        const thisKeys: string[] = Object.keys(this);
        thisKeys.sort((a, b) => a.localeCompare(b));

        thisKeys.splice(thisKeys.indexOf('__name'), 1);

        for (const key of thisKeys) {
            if (
                key === 'customProperties' &&
                Object.keys(this.customProperties!!).length === 0
            ) {
                continue;
            }
            o[key as string] = (this as any)[key];
        }

        return o;
    }

    getType(): String {
        return 'Normal';
    }
}
