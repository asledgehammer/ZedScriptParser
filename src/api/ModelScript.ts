import { ParseBag } from '../parser';
import { BoneWeight, ScriptBoneWeightArray } from './BoneWeight';
import {
    getBoolean,
    getFloat,
    getString,
    Script,
    ScriptBoolean,
    ScriptFloat,
    ScriptString,
    ScriptStringArray,
} from '../Script';

export class ModelScript extends Script {
    animationsMesh: ScriptString;
    boneWeight: ScriptBoneWeightArray;
    invertX: ScriptBoolean;
    mesh: ScriptStringArray;
    scale: ScriptFloat;
    shader: ScriptString;
    static: ScriptBoolean;
    texture: ScriptStringArray;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'animationsmesh':
                this.animationsMesh = getString(value);
                return true;
            case 'boneweight':
                if (this.boneWeight == null) {
                    this.boneWeight = [];
                }
                const raw = getString(value)?.trim();
                if (raw == null) return true;

                if (raw.indexOf(' ') !== -1) {
                    const split = raw.split(' ');
                    this.boneWeight.push(
                        new BoneWeight(split[0], parseFloat(split[1])),
                    );
                } else {
                    this.boneWeight.push(new BoneWeight(raw, 1.0));
                }
                return true;
            case 'invertx':
                this.invertX = getBoolean(value);
                return true;
            case 'mesh':
                this.mesh = getString(value)?.split('/');
                return true;
            case 'scale':
                this.scale = getFloat(value);
                return true;
            case 'shader':
                this.shader = getString(value);
                return true;
            case 'static':
                this.static = getBoolean(value);
                return true;
            case 'texture':
                this.texture = getString(value)
                    ?.split('/')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
        }
        return false;
    }
}
