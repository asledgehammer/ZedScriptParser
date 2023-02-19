export type ScriptModelWeaponPart = ModelWeaponPart | undefined;
export type ScriptModelWeaponPartArray = ModelWeaponPart[] | undefined;

export class ModelWeaponPart {
    partType: string;
    modelName: string;
    attachmentNameSelf: string;
    attachmentParent: string;

    constructor(
        partType: string,
        modelName: string,
        attachmentNameSelf: string,
        attachmentParent: string,
    ) {
        this.partType = partType;
        this.modelName = modelName;
        this.attachmentNameSelf = attachmentNameSelf;
        this.attachmentParent = attachmentParent;
    }
}
