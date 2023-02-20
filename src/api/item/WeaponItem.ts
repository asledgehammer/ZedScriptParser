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
    bringToBearSound: ScriptString;
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
    ejectAmmoSound: ScriptString;
    ejectAmmoStartSound: ScriptString;
    ejectAmmoStopSound: ScriptString;
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
    insertAmmoSound: ScriptString;
    insertAmmoStartSound: ScriptString;
    insertAmmoStopSound: ScriptString;
    impactSound: ScriptString;
    isAimedFirearm: ScriptBoolean;
    isAimedHandWeapon: ScriptBoolean;
    jamGunChance: ScriptFloat;
    knockBackOnNoDeath: ScriptBoolean;
    knockdownMod: ScriptFloat;
    magazineType: ScriptString;
    manuallyRemoveSpentRounds: ScriptBoolean;
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
    projectileCount: ScriptInt;
    pushBackMod: ScriptFloat;
    rackAfterShoot: ScriptBoolean;
    rackSound: ScriptString;
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
    soundMap: ScriptStringArray;
    soundVolume: ScriptInt;
    splatBloodOnNoDeath: ScriptBoolean;
    splatNumber: ScriptInt;
    splatSize: ScriptFloat;
    stopPower: ScriptInt;
    subCategory: ScriptString;
    swingAmountBeforeImpact: ScriptFloat;
    swingSound: ScriptString;
    swingTime: ScriptFloat;
    toHitModifier: ScriptFloat;
    treeDamage: ScriptInt;
    triggerExplosionTimer: ScriptInt;
    twoHandWeapon: ScriptBoolean;
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

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'aimingmod':
                this.aimingMod = getFloat(statement);
                return true;
            case 'aimingperkcritmodifier':
                this.aimingPerkCritModifier = getInt(statement);
                return true;
            case 'aimingperkhitchancemodifier':
                this.aimingPerkHitChanceModifier = getFloat(statement);
                return true;
            case 'aimingperkminanglemodifier':
                this.aimingPerkMinAngleModifier = getFloat(statement);
                return true;
            case 'aimingperkrangemodifier':
                this.aimingPerkRangeModifier = getFloat(statement);
                return true;
            case 'aimingtime':
                this.aimingTime = getInt(statement);
                return true;
            case 'alwaysknockdown':
                this.alwaysKnockdown = getBoolean(statement);
                return true;
            case 'ammobox':
                this.ammoBox = getString(statement);
                return true;
            case 'anglefalloff':
                this.angleFalloff = getBoolean(statement);
                return true;
            case 'basespeed':
                this.baseSpeed = getFloat(statement);
                return true;
            case 'bringtobearsound':
                this.bringToBearSound = getString(statement);
                return true;
            case 'bulletoutsound':
                this.bulletOutSound = getString(statement);
                return true;
            case 'canbarricade':
                this.canBarricade = getBoolean(statement);
                return true;
            case 'canbeplaced':
                this.canBePlaced = getBoolean(statement);
                return true;
            case 'canbereused':
                this.canBeReused = getBoolean(statement);
                return true;
            case 'cantattackwithlowestendurance':
                this.cantAttackWithLowestEndurance = getBoolean(statement);
                return true;
            case 'categories':
                this.categories = getString(statement)?.split(';');
                return true;
            case 'clicksound':
                this.clickSound = getString(statement);
                return true;
            case 'clipsize':
                this.clipSize = getInt(statement);
                return true;
            case 'conditionlowerchanceonein':
                this.conditionLowerChanceOneIn = getInt(statement);
                return true;
            case 'critdmgmultiplier':
                this.critDmgMultiplier = getFloat(statement);
                return true;
            case 'criticalchance':
                this.criticalChance = getFloat(statement);
                return true;
            case 'damagecategory':
                this.damageCategory = getString(statement);
                return true;
            case 'damagemakehole':
                this.damageMakeHole = getBoolean(statement);
                return true;
            case 'doordamage':
                this.doorDamage = getInt(statement);
                return true;
            case 'doorhitsound':
                this.doorHitSound = getString(statement);
                return true;
            case 'ejectammosound':
                this.ejectAmmoSound = getString(statement);
                return true;
            case 'ejectammostartsound':
                this.ejectAmmoStartSound = getString(statement);
                return true;
            case 'ejectammostopsound':
                this.ejectAmmoStartSound = getString(statement);
                return true;
            case 'endurancemod':
                this.enduranceMod = getFloat(statement);
                return true;
            case 'equipsound':
                this.equipSound = getString(statement);
                return true;
            case 'explosionpower':
                this.explosionPower = getInt(statement);
                return true;
            case 'explosionrange':
                this.explosionRange = getInt(statement);
                return true;
            case 'explosiontimer':
                this.explosionTimer = getInt(statement);
                return true;
            case 'extradamage':
                this.extraDamage = getFloat(statement);
                return true;
            case 'firemode':
                this.fireMode = getString(statement);
                return true;
            case 'firemodepossibilities':
                this.fireModePossibilities = getString(statement)?.split('/');
                return true;
            case 'firepower':
                this.firePower = getInt(statement);
                return true;
            case 'firerange':
                this.fireRange = getInt(statement);
                return true;
            case 'havechamber':
                this.haveChamber = getBoolean(statement);
                return true;
            case 'hitanglemod':
                this.hitAngleMod = getFloat(statement);
                return true;
            case 'hitchance':
                this.hitChance = getInt(statement);
                return true;
            case 'hitfloorsound':
                this.hitFloorSound = getString(statement);
                return true;
            case 'hitsound':
                this.hitSound = getString(statement);
                return true;
            case 'idleanim':
                this.idleAnim = getString(statement);
                return true;
            case 'impactsound':
                this.impactSound = getString(statement);
                return true;
            case 'insertallbulletsreload':
                this.insertAllBulletsReload = getBoolean(statement);
                return true;
            case 'insertammosound':
                this.insertAmmoSound = getString(statement);
                return true;
            case 'insertammostartsound':
                this.insertAmmoStartSound = getString(statement);
                return true;
            case 'insertammostopsound':
                this.insertAmmoStopSound = getString(statement);
                return true;
            case 'isaimedfirearm':
                this.isAimedFirearm = getBoolean(statement);
                return true;
            case 'isaimedhandweapon':
                this.isAimedHandWeapon = getBoolean(statement);
                return true;
            case 'jamgunchance':
                this.jamGunChance = getFloat(statement);
                return true;
            case 'knockbackonnodeath':
                this.knockBackOnNoDeath = getBoolean(statement);
                return true;
            case 'knockdownmod':
                this.knockdownMod = getFloat(statement);
                return true;
            case 'magazinetype':
                this.magazineType = getString(statement);
                return true;
            case 'manuallyremovespentrounds':
                this.manuallyRemoveSpentRounds = getBoolean(statement);
                return true;
            case 'maxdamage':
                this.maxDamage = getFloat(statement);
                return true;
            case 'maxhitcount':
                this.maxHitCount = getInt(statement);
                return true;
            case 'maxrange':
                this.maxRange = getFloat(statement);
                return true;
            case 'minangle':
                this.minAngle = getFloat(statement);
                return true;
            case 'mindamage':
                this.minDamage = getFloat(statement);
                return true;
            case 'minimumswingtime':
                this.minimumSwingTime = getFloat(statement);
                return true;
            case 'minrange':
                this.minRange = getFloat(statement);
                return true;
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
                return true;
            case 'noiseduration':
                this.noiseDuration = getInt(statement);
                return true;
            case 'noiserange':
                this.noiseRange = getInt(statement);
                return true;
            case 'npcsoundboost':
                this.npcSoundBoost = getFloat(statement);
                return true;
            case 'otherhandrequire':
                this.otherHandRequire = getString(statement);
                return true;
            case 'otherhanduse':
                this.otherHandUse = getBoolean(statement);
                return true;
            case 'physicsobject':
                this.physicsObject = getString(statement);
                return true;
            case 'piercingbullets':
                this.piercingBullets = getBoolean(statement);
                return true;
            case 'placedsprite':
                this.placedSprite = getString(statement);
                return true;
            case 'projectilecount':
                this.projectileCount = getInt(statement);
                return true;
            case 'pushbackmod':
                this.pushBackMod = getFloat(statement);
                return true;
            case 'rackaftershoot':
                this.rackAfterShoot = getBoolean(statement);
                return true;
            case 'racksound':
                this.rackSound = getString(statement);
                return true;
            case 'ranged':
                this.ranged = getBoolean(statement);
                return true;
            case 'rangefalloff':
                this.rangeFalloff = getBoolean(statement);
                return true;
            case 'recoildelay':
                this.recoilDelay = getInt(statement);
                return true;
            case 'reloadtime':
                this.reloadTime = getInt(statement);
                return true;
            case 'runanim':
                this.runAnim = getString(statement);
                return true;
            case 'sensorrange':
                this.sensorRange = getInt(statement);
                return true;
            case 'sharedamage':
                this.shareDamage = getBoolean(statement);
                return true;
            case 'shareendurance':
                this.shareEndurance = getBoolean(statement);
                return true;
            case 'shellfallsound':
                this.shellFallSound = getString(statement);
                return true;
            case 'smokerange':
                this.smokeRange = getInt(statement);
                return true;
            case 'soundgain':
                this.soundGain = getFloat(statement);
                return true;
            case 'soundmap':
                this.soundMap = getString(statement)?.split(' ');
                return true;
            case 'soundvolume':
                this.soundVolume = getInt(statement);
                return true;
            case 'splatbloodonnodeath':
                this.splatBloodOnNoDeath = getBoolean(statement);
                return true;
            case 'splatnumber':
                this.splatNumber = getInt(statement);
                return true;
            case 'splatsize':
                this.splatSize = getFloat(statement);
                return true;
            case 'stoppower':
                this.stopPower = getInt(statement);
                return true;
            case 'subcategory':
                this.subCategory = getString(statement);
                return true;
            case 'swingamountbeforeimpact':
                this.swingAmountBeforeImpact = getFloat(statement);
                return true;
            case 'swingsound':
                this.swingSound = getString(statement);
                return true;
            case 'swingtime':
                this.swingTime = getFloat(statement);
                return true;
            case 'tohitmodifier':
                this.toHitModifier = getFloat(statement);
                return true;
            case 'treedamage':
                this.treeDamage = getInt(statement);
                return true;
            case 'triggerexplosiontimer':
                this.triggerExplosionTimer = getInt(statement);
                return true;
            case 'twohandweapon':
                this.twoHandWeapon = getBoolean(statement);
                return true;
            case 'unequipsound':
                this.unequipSound = getString(statement);
                return true;
            case 'useendurance':
                this.useEndurance = getBoolean(statement);
                return true;
            case 'useself':
                this.useSelf = getBoolean(statement);
                return true;
            case 'weaponlength':
                this.weaponLength = getFloat(statement);
                return true;
            case 'weaponreloadtype':
                this.weaponReloadType = getString(statement);
                return true;
            case 'weaponsprite':
                this.weaponSprite = getString(statement);
                return true;
            case 'weaponweight':
                this.weaponWeight = getFloat(statement);
                return true;
        }

        return super.onStatement(statement);
    }

    allowCustomProperties() {
        return true;
    }

    getType(): String {
        return 'Weapon';
    }
}
