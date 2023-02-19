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
                break;
            case 'aimingperkcritmodifier':
                this.aimingPerkCritModifier = getInt(statement);
                break;
            case 'aimingperkhitchancemodifier':
                this.aimingPerkHitChanceModifier = getFloat(statement);
                break;
            case 'aimingperkminanglemodifier':
                this.aimingPerkMinAngleModifier = getFloat(statement);
                break;
            case 'aimingperkrangemodifier':
                this.aimingPerkRangeModifier = getFloat(statement);
                break;
            case 'aimingtime':
                this.aimingTime = getInt(statement);
                break;
            case 'alwaysknockdown':
                this.alwaysKnockdown = getBoolean(statement);
                break;
            case 'ammobox':
                this.ammoBox = getString(statement);
                break;
            case 'anglefalloff':
                this.angleFalloff = getBoolean(statement);
                break;
            case 'basespeed':
                this.baseSpeed = getFloat(statement);
                break;
            case 'bulletoutsound':
                this.bulletOutSound = getString(statement);
                break;
            case 'canbarricade':
                this.canBarricade = getBoolean(statement);
                break;
            case 'canbeplaced':
                this.canBePlaced = getBoolean(statement);
                break;
            case 'canbereused':
                this.canBeReused = getBoolean(statement);
                break;
            case 'cantattackwithlowestendurance':
                this.cantAttackWithLowestEndurance = getBoolean(statement);
                break;
            case 'categories':
                this.categories = getString(statement)?.split(';');
                break;
            case 'clicksound':
                this.clickSound = getString(statement);
                break;
            case 'clipsize':
                this.clipSize = getInt(statement);
                break;
            case 'conditionlowerchanceonein':
                this.conditionLowerChanceOneIn = getInt(statement);
                break;
            case 'critdmgmultiplier':
                this.critDmgMultiplier = getFloat(statement);
                break;
            case 'criticalchance':
                this.criticalChance = getFloat(statement);
                break;
            case 'damagecategory':
                this.damageCategory = getString(statement);
                break;
            case 'damagemakehole':
                this.damageMakeHole = getBoolean(statement);
                break;
            case 'doordamage':
                this.doorDamage = getInt(statement);
                break;
            case 'doorhitsound':
                this.doorHitSound = getString(statement);
                break;
            case 'endurancemod':
                this.enduranceMod = getFloat(statement);
                break;
            case 'explosionpower':
                this.explosionPower = getInt(statement);
                break;
            case 'explosionrange':
                this.explosionRange = getInt(statement);
                break;
            case 'explosiontimer':
                this.explosionTimer = getInt(statement);
                break;
            case 'extradamage':
                this.extraDamage = getFloat(statement);
                break;
            case 'firemode':
                this.fireMode = getString(statement);
                break;
            case 'firemodepossibilities':
                this.fireModePossibilities = getString(statement)?.split('/');
                break;
            case 'firepower':
                this.firePower = getInt(statement);
                break;
            case 'firerange':
                this.fireRange = getInt(statement);
                break;
            case 'havechamber':
                this.haveChamber = getBoolean(statement);
                break;
            case 'hitanglemod':
                this.hitAngleMod = getFloat(statement);
                break;
            case 'hitchance':
                this.hitChance = getInt(statement);
                break;
            case 'hitfloorsound':
                this.hitFloorSound = getString(statement);
                break;
            case 'hitsound':
                this.hitSound = getString(statement);
                break;
            case 'idleanim':
                this.idleAnim = getString(statement);
                break;
            case 'impactsound':
                this.impactSound = getString(statement);
                break;
            case 'insertallbulletsreload':
                this.insertAllBulletsReload = getBoolean(statement);
                break;
            case 'isaimedfirearm':
                this.isAimedFirearm = getBoolean(statement);
                break;
            case 'isaimedhandweapon':
                this.isAimedHandWeapon = getBoolean(statement);
                break;
            case 'jamgunchance':
                this.jamGunChance = getFloat(statement);
                break;
            case 'knockbackonnodeath':
                this.knockBackOnNoDeath = getBoolean(statement);
                break;
            case 'knockdownmod':
                this.knockdownMod = getFloat(statement);
                break;
            case 'magazinetype':
                this.magazineType = getString(statement);
                break;
            case 'maxdamage':
                this.maxDamage = getFloat(statement);
                break;
            case 'maxhitcount':
                this.maxHitCount = getInt(statement);
                break;
            case 'maxrange':
                this.maxRange = getFloat(statement);
                break;
            case 'minangle':
                this.minAngle = getFloat(statement);
                break;
            case 'mindamage':
                this.minDamage = getFloat(statement);
                break;
            case 'minimumswingtime':
                this.minimumSwingTime = getFloat(statement);
                break;
            case 'minrange':
                this.minRange = getFloat(statement);
                break;
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
                break;
            case 'noiserange':
                this.noiseRange = getInt(statement);
                break;
            case 'npcsoundboost':
                this.npcSoundBoost = getFloat(statement);
                break;
            case 'otherhandrequire':
                this.otherHandRequire = getString(statement);
                break;
            case 'otherhanduse':
                this.otherHandUse = getBoolean(statement);
                break;
            case 'physicsobject':
                this.physicsObject = getString(statement);
                break;
            case 'piercingbullets':
                this.piercingBullets = getBoolean(statement);
                break;
            case 'placedsprite':
                this.placedSprite = getString(statement);
                break;
            case 'pushbackmod':
                this.pushBackMod = getFloat(statement);
                break;
            case 'rackaftershoot':
                this.rackAfterShoot = getBoolean(statement);
                break;
            case 'ranged':
                this.ranged = getBoolean(statement);
                break;
            case 'rangefalloff':
                this.rangeFalloff = getBoolean(statement);
                break;
            case 'recoildelay':
                this.recoilDelay = getInt(statement);
                break;
            case 'reloadtime':
                this.reloadTime = getInt(statement);
                break;
            case 'runanim':
                this.runAnim = getString(statement);
                break;
            case 'sensorrange':
                this.sensorRange = getInt(statement);
                break;
            case 'sharedamage':
                this.shareDamage = getBoolean(statement);
                break;
            case 'shareendurance':
                this.shareEndurance = getBoolean(statement);
                break;
            case 'shellfallsound':
                this.shellFallSound = getString(statement);
                break;
            case 'smokerange':
                this.smokeRange = getInt(statement);
                break;
            case 'soundgain':
                this.soundGain = getFloat(statement);
                break;
            case 'soundradius':
                this.soundRadius = getInt(statement);
                break;
            case 'soundvolume':
                this.soundVolume = getInt(statement);
                break;
            case 'splatbloodonnodeath':
                this.splatBloodOnNoDeath = getBoolean(statement);
                break;
            case 'splatnumber':
                this.splatNumber = getInt(statement);
                break;
            case 'splatsize':
                this.splatSize = getFloat(statement);
                break;
            case 'subcategory':
                this.subCategory = getString(statement);
                break;
            case 'swingamountbeforeimpact':
                this.swingAmountBeforeImpact = getFloat(statement);
                break;
            case 'swingsound':
                this.swingSound = getString(statement);
                break;
            case 'swingtime':
                this.swingTime = getFloat(statement);
                break;
            case 'tohitmodifier':
                this.toHitModifier = getFloat(statement);
                break;
            case 'treedamage':
                this.treeDamage = getInt(statement);
                break;
            case 'triggerexplosiontimer':
                this.triggerExplosionTimer = getInt(statement);
                break;
            case 'useendurance':
                this.useEndurance = getBoolean(statement);
                break;
            case 'useself':
                this.useSelf = getBoolean(statement);
                break;
            case 'weaponlength':
                this.weaponLength = getFloat(statement);
                break;
            case 'weaponreloadtype':
                this.weaponReloadType = getString(statement);
                break;
            case 'weaponsprite':
                this.weaponSprite = getString(statement);
                break;
            case 'weaponweight':
                this.weaponWeight = getFloat(statement);
                break;
            default:
                // console.warn(`[${this.name}] :: Unknown property: ${property}`);
                break;
        }

        super.onStatement(statement);
    }

    getType(): String {
        return 'Weapon';
    }
}
