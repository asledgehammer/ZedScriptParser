import { AssignmentStatement, ObjectStatement } from 'ast';
import { BoneWeight, ScriptBoneWeightArray } from './BoneWeight';
import {
    getBoolean,
    getFloat,
    getString,
    ScriptBoolean,
    ScriptFloat,
    ScriptObject,
    ScriptString,
    ScriptStringArray,
} from './ScriptObject';

export class ModelScript extends ScriptObject {
    animationsMesh: ScriptString;
    boneWeight: ScriptBoneWeightArray;
    invertX: ScriptBoolean;
    mesh: ScriptStringArray;
    scale: ScriptFloat;
    shader: ScriptString;
    static: ScriptBoolean;
    texture: ScriptStringArray;

    constructor(statement: ObjectStatement) {
        super(statement);
    }

    onStatement(statement: AssignmentStatement): boolean {
        const property = statement.id.value;
        switch (property.toLowerCase()) {
            case 'animationsmesh':
                this.animationsMesh = getString(statement);
                return true;
            case 'boneweight':
                if (this.boneWeight == null) {
                    this.boneWeight = [];
                }
                const raw = getString(statement)?.trim();
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
                this.invertX = getBoolean(statement);
                return true;
            case 'mesh':
                this.mesh = getString(statement)?.split('/');
                return true;
            case 'scale':
                this.scale = getFloat(statement);
                return true;
            case 'shader':
                this.shader = getString(statement);
                return true;
            case 'static':
                this.static = getBoolean(statement);
                return true;
            case 'texture':
                this.texture = getString(statement)
                    ?.split('/')
                    .map((a) => {
                        return a.trim();
                    });
                return true;
        }
        return false;
    }

    allowCustomProperties(): boolean {
        return true;
    }
}
