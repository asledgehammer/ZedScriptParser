import { getInt, getString, ScriptInt, ScriptString } from '../Script';
import { ParseBag } from '../parser';

export type ScriptCopyFramesArray = CopyFrames[] | undefined;

export class CopyFrames {
    frame: ScriptInt;
    source: ScriptString;
    sourceFrame1: ScriptInt;
    sourceFrame2: ScriptInt;

    parse(bag: ParseBag) {
        while (!bag.isEOF()) {
            const curr = bag.next();
            if (curr === '}') return;

            const [property, value] = curr.split('=');
            const propLower = property.toLowerCase();

            switch (propLower) {
                case 'frame':
                    this.frame = getInt(value);
                    break;
                case 'source':
                    this.source = getString(value);
                    break;
                case 'sourceframe1':
                    this.sourceFrame1 = getInt(value);
                    break;
                case 'sourceframe2':
                    this.sourceFrame2 = getInt(value);
                    break;
            }
        }
    }
}
