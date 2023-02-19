import {
    getBoolean,
    getFloat,
    getInt,
    getString,
    ScriptBoolean,
    ScriptFloat,
    ScriptInt,
    ScriptString,
    ScriptStringArray,
} from '../ScriptObject';
import { AssignmentStatement, ObjectStatement } from 'ast';
import { ItemScript } from './ItemScript';
import { ModelWeaponPart, ScriptModelWeaponPartArray } from './ModelWeaponPart';

export class WeaponItem extends ItemScript {
    aimingMod: ScriptFloat;
    aimingPerkCritModifier: ScriptInt;
    aimingPerkHitChanceModifier: ScriptFloat;
    aimingPerkMinAngleModifier: ScriptFloat;
    aimingPerkRangeModifier: ScriptFloat;
    aimingTime: ScriptInt;
    alwaysKnockdown: ScriptBoolean;
    ammoBox: ScriptString;
    angleFalloff: ScriptBoolean;
    baseSpeed: ScriptFloat;
    bulletOutSound: ScriptString;
    canBarricade: ScriptBoolean;
    canBePlaced: ScriptBoolean;
    canBeReused: ScriptBoolean;
    cantAttackWithLowestEndurance: ScriptBoolean;
    clickSound: ScriptString;
    clipSize: ScriptInt;
    categories: ScriptStringArray;
    conditionLowerChanceOneIn: ScriptInt;
    critDmgMultiplier: ScriptFloat;
    criticalChance: ScriptFloat;
    damageCategory: ScriptString;
    damageMakeHole: ScriptBoolean;
    doorDamage: ScriptInt;
    doorHitSound: ScriptString;
    enduranceMod: ScriptFloat;
    equipSound: ScriptString;
    explosionPower: ScriptInt;
    explosionRange: ScriptInt;
    explosionTimer: ScriptInt;
    extraDamage: ScriptFloat;
    fireMode: ScriptString;
    fireModePossibilities: ScriptStringArray;
    firePower: ScriptInt;
    fireRange: ScriptInt;
    haveChamber: ScriptBoolean;
    hitAngleMod: ScriptFloat;
    hitChance: ScriptInt;
    hitFloorSound: ScriptString;
    hitSound: ScriptString;
    idleAnim: ScriptString;
    insertAllBulletsReload: ScriptBoolean;
    impactSound: ScriptString;
    isAimedFirearm: ScriptBoolean;
    isAimedHandWeapon: ScriptBoolean;
    jamGunChance: ScriptFloat;
    knockBackOnNoDeath: ScriptBoolean;
    knockdownMod: ScriptFloat;
    magazineType: ScriptString;
    maxDamage: ScriptFloat;
    maxHitCount: ScriptInt;
    maxRange: ScriptFloat;
    minAngle: ScriptFloat;
    minDamage: ScriptFloat;
    minimumSwingTime: ScriptFloat;
    minRange: ScriptFloat;
    modelWeaponParts: ScriptModelWeaponPartArray;
    multipleHitConditionAffected: ScriptBoolean;
    noiseDuration: ScriptInt;
    noiseRange: ScriptInt;
    npcSoundBoost: ScriptFloat;
    otherHandRequire: ScriptString;
    otherHandUse: ScriptBoolean;
    physicsObject: ScriptString;
    piercingBullets: ScriptBoolean;
    placedSprite: ScriptString;
    pushBackMod: ScriptFloat;
    rackAfterShoot: ScriptBoolean;
    ranged: ScriptBoolean;
    rangeFalloff: ScriptBoolean;
    recoilDelay: ScriptInt;
    reloadTime: ScriptInt;
    runAnim: ScriptString;
    sensorRange: ScriptInt;
    shareDamage: ScriptBoolean;
    shareEndurance: ScriptBoolean;
    shellFallSound: ScriptString;
    smokeRange: ScriptInt;
    soundGain: ScriptFloat;
    soundRadius: ScriptInt;
    soundVolume: ScriptInt;
    splatBloodOnNoDeath: ScriptBoolean;
    splatNumber: ScriptInt;
    splatSize: ScriptFloat;
    subCategory: ScriptString;
    swingAmountBeforeImpact: ScriptFloat;
    swingSound: ScriptString;
    swingTime: ScriptFloat;
    toHitModifier: ScriptFloat;
    treeDamage: ScriptInt;
    triggerExplosionTimer: ScriptInt;
    unequipSound: ScriptString;
    useEndurance: ScriptBoolean;
    useSelf: ScriptBoolean;
    weaponLength: ScriptFloat;
    weaponReloadType: ScriptString;
    weaponSprite: ScriptString;
    weaponWeight: ScriptFloat;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): void {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'aimingmod':
                this.aimingMod = getFloat(statement);
                return;
            case 'aimingperkcritmodifier':
                this.aimingPerkCritModifier = getInt(statement);
                return;
            case 'aimingperkhitchancemodifier':
                this.aimingPerkHitChanceModifier = getFloat(statement);
                return;
            case 'aimingperkminanglemodifier':
                this.aimingPerkMinAngleModifier = getFloat(statement);
                return;
            case 'aimingperkrangemodifier':
                this.aimingPerkRangeModifier = getFloat(statement);
                return;
            case 'aimingtime':
                this.aimingTime = getInt(statement);
                return;
            case 'alwaysknockdown':
                this.alwaysKnockdown = getBoolean(statement);
                return;
            case 'ammobox':
                this.ammoBox = getString(statement);
                return;
            case 'anglefalloff':
                this.angleFalloff = getBoolean(statement);
                return;
            case 'basespeed':
                this.baseSpeed = getFloat(statement);
                return;
            case 'bulletoutsound':
                this.bulletOutSound = getString(statement);
                return;
            case 'canbarricade':
                this.canBarricade = getBoolean(statement);
                return;
            case 'canbeplaced':
                this.canBePlaced = getBoolean(statement);
                return;
            case 'canbereused':
                this.canBeReused = getBoolean(statement);
                return;
            case 'cantattackwithlowestendurance':
                this.cantAttackWithLowestEndurance = getBoolean(statement);
                return;
            case 'categories':
                this.categories = getString(statement)?.split(';');
                return;
            case 'clicksound':
                this.clickSound = getString(statement);
                return;
            case 'clipsize':
                this.clipSize = getInt(statement);
                return;
            case 'conditionlowerchanceonein':
                this.conditionLowerChanceOneIn = getInt(statement);
                return;
            case 'critdmgmultiplier':
                this.critDmgMultiplier = getFloat(statement);
                return;
            case 'criticalchance':
                this.criticalChance = getFloat(statement);
                return;
            case 'damagecategory':
                this.damageCategory = getString(statement);
                return;
            case 'damagemakehole':
                this.damageMakeHole = getBoolean(statement);
                return;
            case 'doordamage':
                this.doorDamage = getInt(statement);
                return;
            case 'doorhitsound':
                this.doorHitSound = getString(statement);
                return;
            case 'endurancemod':
                this.enduranceMod = getFloat(statement);
                return;
            case 'equipsound':
                this.equipSound = getString(statement);
                return;
            case 'explosionpower':
                this.explosionPower = getInt(statement);
                return;
            case 'explosionrange':
                this.explosionRange = getInt(statement);
                return;
            case 'explosiontimer':
                this.explosionTimer = getInt(statement);
                return;
            case 'extradamage':
                this.extraDamage = getFloat(statement);
                return;
            case 'firemode':
                this.fireMode = getString(statement);
                return;
            case 'firemodepossibilities':
                this.fireModePossibilities = getString(statement)?.split('/');
                return;
            case 'firepower':
                this.firePower = getInt(statement);
                return;
            case 'firerange':
                this.fireRange = getInt(statement);
                return;
            case 'havechamber':
                this.haveChamber = getBoolean(statement);
                return;
            case 'hitanglemod':
                this.hitAngleMod = getFloat(statement);
                return;
            case 'hitchance':
                this.hitChance = getInt(statement);
                return;
            case 'hitfloorsound':
                this.hitFloorSound = getString(statement);
                return;
            case 'hitsound':
                this.hitSound = getString(statement);
                return;
            case 'idleanim':
                this.idleAnim = getString(statement);
                return;
            case 'impactsound':
                this.impactSound = getString(statement);
                return;
            case 'insertallbulletsreload':
                this.insertAllBulletsReload = getBoolean(statement);
                return;
            case 'isaimedfirearm':
                this.isAimedFirearm = getBoolean(statement);
                return;
            case 'isaimedhandweapon':
                this.isAimedHandWeapon = getBoolean(statement);
                return;
            case 'jamgunchance':
                this.jamGunChance = getFloat(statement);
                return;
            case 'knockbackonnodeath':
                this.knockBackOnNoDeath = getBoolean(statement);
                return;
            case 'knockdownmod':
                this.knockdownMod = getFloat(statement);
                return;
            case 'magazinetype':
                this.magazineType = getString(statement);
                return;
            case 'maxdamage':
                this.maxDamage = getFloat(statement);
                return;
            case 'maxhitcount':
                this.maxHitCount = getInt(statement);
                return;
            case 'maxrange':
                this.maxRange = getFloat(statement);
                return;
            case 'minangle':
                this.minAngle = getFloat(statement);
                return;
            case 'mindamage':
                this.minDamage = getFloat(statement);
                return;
            case 'minimumswingtime':
                this.minimumSwingTime = getFloat(statement);
                return;
            case 'minrange':
                this.minRange = getFloat(statement);
                return;
            case 'modelweaponpart':
                const [
                    partType,
                    modelName,
                    attachmentNameSelf,
                    attachmentParent,
                ] = getString(statement)!!.split(' ');
                const mwp = new ModelWeaponPart(
                    partType,
                    modelName,
                    attachmentNameSelf,
                    attachmentParent,
                );
                if (this.modelWeaponParts == null) {
                    this.modelWeaponParts = [];
                }
                this.modelWeaponParts.push(mwp);
            case 'multiplehitconditionaffected':
                this.multipleHitConditionAffected = getBoolean(statement);
                return;
            case 'noiseduration':
                this.noiseDuration = getInt(statement);
                return;
            case 'noiserange':
                this.noiseRange = getInt(statement);
                return;
            case 'npcsoundboost':
                this.npcSoundBoost = getFloat(statement);
                return;
            case 'otherhandrequire':
                this.otherHandRequire = getString(statement);
                return;
            case 'otherhanduse':
                this.otherHandUse = getBoolean(statement);
                return;
            case 'physicsobject':
                this.physicsObject = getString(statement);
                return;
            case 'piercingbullets':
                this.piercingBullets = getBoolean(statement);
                return;
            case 'placedsprite':
                this.placedSprite = getString(statement);
                return;
            case 'pushbackmod':
                this.pushBackMod = getFloat(statement);
                return;
            case 'rackaftershoot':
                this.rackAfterShoot = getBoolean(statement);
                return;
            case 'ranged':
                this.ranged = getBoolean(statement);
                return;
            case 'rangefalloff':
                this.rangeFalloff = getBoolean(statement);
                return;
            case 'recoildelay':
                this.recoilDelay = getInt(statement);
                return;
            case 'reloadtime':
                this.reloadTime = getInt(statement);
                return;
            case 'runanim':
                this.runAnim = getString(statement);
                return;
            case 'sensorrange':
                this.sensorRange = getInt(statement);
                return;
            case 'sharedamage':
                this.shareDamage = getBoolean(statement);
                return;
            case 'shareendurance':
                this.shareEndurance = getBoolean(statement);
                return;
            case 'shellfallsound':
                this.shellFallSound = getString(statement);
                return;
            case 'smokerange':
                this.smokeRange = getInt(statement);
                return;
            case 'soundgain':
                this.soundGain = getFloat(statement);
                return;
            case 'soundradius':
                this.soundRadius = getInt(statement);
                return;
            case 'soundvolume':
                this.soundVolume = getInt(statement);
                return;
            case 'splatbloodonnodeath':
                this.splatBloodOnNoDeath = getBoolean(statement);
                return;
            case 'splatnumber':
                this.splatNumber = getInt(statement);
                return;
            case 'splatsize':
                this.splatSize = getFloat(statement);
                return;
            case 'subcategory':
                this.subCategory = getString(statement);
                return;
            case 'swingamountbeforeimpact':
                this.swingAmountBeforeImpact = getFloat(statement);
                return;
            case 'swingsound':
                this.swingSound = getString(statement);
                return;
            case 'swingtime':
                this.swingTime = getFloat(statement);
                return;
            case 'tohitmodifier':
                this.toHitModifier = getFloat(statement);
                return;
            case 'treedamage':
                this.treeDamage = getInt(statement);
                return;
            case 'triggerexplosiontimer':
                this.triggerExplosionTimer = getInt(statement);
                return;
            case 'unequipsound':
                this.unequipSound = getString(statement);
                return;
            case 'useendurance':
                this.useEndurance = getBoolean(statement);
                return;
            case 'useself':
                this.useSelf = getBoolean(statement);
                return;
            case 'weaponlength':
                this.weaponLength = getFloat(statement);
                return;
            case 'weaponreloadtype':
                this.weaponReloadType = getString(statement);
                return;
            case 'weaponsprite':
                this.weaponSprite = getString(statement);
                return;
            case 'weaponweight':
                this.weaponWeight = getFloat(statement);
                return;
            default:
                break;
        }

        super.onStatement(statement);
    }

    allowCustomProperties() {
        return true;
    }

    getType(): String {
        return 'Weapon';
    }
}
