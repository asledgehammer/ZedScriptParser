import { ParseBag, ParseError } from '../../Parser';
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
        super(bag, '=');
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
            case 'copyframe':
                if (bag.next() !== '{') {
                    throw new ParseError(`Expected '{'`);
                }
                if (this.copyFrame == null) this.copyFrame = [];
                const copyFrame = new CopyFrame();
                copyFrame.parse(bag);
                this.copyFrame.push(copyFrame);
                return true;
            case 'copyframes':
                if (bag.next() !== '{') {
                    throw new ParseError(`Expected '{'`);
                }
                if (this.copyFrames == null) this.copyFrames = [];
                const copyFrames = new CopyFrames();
                copyFrames.parse(bag);
                this.copyFrames.push(copyFrames);
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

    parse(bag: ParseBag) {
        while (!bag.isEOF()) {
            const curr = bag.next();
            if (curr === '}') return;

            const split = curr.split('=');
            const property = split[0];
            const value = split[1];
            const propLower = property.toLowerCase();

            switch (propLower) {
                case 'animationdirectory':
                    if (this.animationDirectories == null) {
                        this.animationDirectories = [];
                    }
                    this.animationDirectories.push(getString(value)!!);
                    break;
                case 'meshname':
                    this.meshName = getString(value);
                    break;
                case 'copyframe':
                    if (bag.next() !== '{') {
                        throw new ParseError(`Expected '{'`);
                    }
                    if (this.copyFrame == null) this.copyFrame = [];
                    const copyFrame = new CopyFrame();
                    copyFrame.parse(bag);
                    this.copyFrame.push(copyFrame);
                    break;
                case 'copyframes':
                    if (bag.next() !== '{') {
                        throw new ParseError(`Expected '{'`);
                    }
                    if (this.copyFrames == null) this.copyFrames = [];
                    const copyFrames = new CopyFrames();
                    copyFrames.parse(bag);
                    this.copyFrames.push(copyFrames);
                    break;
                default:
            }
        }
    }
}
