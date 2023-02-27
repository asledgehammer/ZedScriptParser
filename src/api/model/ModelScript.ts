import { ParseBag } from '../../Parser';
import { BoneWeight, ScriptBoneWeightArray } from './BoneWeight';
import {
    getBoolean,
    getFloat,
    getString,
    getURI,
    Script,
    ScriptBoolean,
    ScriptFloat,
    ScriptString,
    ScriptStringArray,
} from '../Script';
import { Attachment } from '../Attachment';

export class ModelScript extends Script {
    animationsMesh: ScriptString;
    attachments: Attachment[] | undefined;
    boneWeight: ScriptBoneWeightArray;
    invertX: ScriptBoolean;
    mesh: ScriptString;
    scale: ScriptFloat;
    shader: ScriptString;
    static: ScriptBoolean;
    texture: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
            case 'attachment':
                if (this.attachments == null) this.attachments = [];
                this.attachments.push(new Attachment(bag));

                return true;
        }
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
                this.mesh = getURI(value);
                return true;
            case 'scale':
                this.scale = getFloat(value);
                return true;
            case 'shader':
                this.shader = getURI(value);
                return true;
            case 'static':
                this.static = getBoolean(value);
                return true;
            case 'texture':
                this.texture = getURI(value);
                return true;
        }
        return false;
    }
}
