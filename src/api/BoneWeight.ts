export type ScriptBoneWeightArray = BoneWeight[] | undefined;
export class BoneWeight {
    name: string;
    weight: number;

    constructor(name: string, weight: number) {
        this.name = name;
        this.weight = weight;
    }
}
