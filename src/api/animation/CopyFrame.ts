import { getInt, getString, ScriptInt, ScriptString } from '../Script';
import { ParseBag } from '../../Parser';

export type ScriptCopyFrameArray = CopyFrame[] | undefined;

export class CopyFrame {
    frame: ScriptInt;
    source: ScriptString;
    sourceFrame: ScriptInt;

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
                case 'sourceframe':
                    this.sourceFrame = getInt(value);
                    break;
            }
        }
    }
}
