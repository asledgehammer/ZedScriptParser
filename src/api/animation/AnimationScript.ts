import { ParseBag } from '../../Parser';
import { getString, Script, ScriptString, ScriptStringArray } from '../Script';
import { CopyFrame, ScriptCopyFrameArray } from './CopyFrame';
import { CopyFrames, ScriptCopyFramesArray } from './CopyFrames';

/**
 * **AnimationScript**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class AnimationScript extends Script {
    animationDirectories: ScriptStringArray;
    copyFrame: ScriptCopyFrameArray;
    copyFrames: ScriptCopyFramesArray;
    meshName: ScriptString;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
            case 'copyframe':
                if (this.copyFrame == null) this.copyFrame = [];
                this.copyFrame.push(new CopyFrame(bag));
                return true;
            case 'copyframes':
                if (this.copyFrames == null) this.copyFrames = [];
                this.copyFrames.push(new CopyFrames(bag));
                return true;
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
            case 'animationdirectory':
                if (this.animationDirectories == null) {
                    this.animationDirectories = [];
                }
                this.animationDirectories.push(getString(value));
                return true;
            case 'meshname':
                this.meshName = getString(value);
                return true;
        }
        return false;
    }
}
