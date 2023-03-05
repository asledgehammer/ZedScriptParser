/**
 * *ScriptBoneWeightArray*
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export type ScriptBoneWeightArray = BoneWeight[] | undefined;

/**
 * **BoneWeight**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class BoneWeight {
    name: string;
    weight: number;

    constructor(name: string, weight: number) {
        this.name = name;
        this.weight = weight;
    }
}
