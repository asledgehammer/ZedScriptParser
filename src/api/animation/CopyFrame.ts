import { getInt, getString, ScriptInt, ScriptString } from '../Script';
import { ParseBag } from '../../Parser';

/**
 * *ScriptCopyFrameArray*
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export type ScriptCopyFrameArray = CopyFrame[] | undefined;

/**
 * **CopyFrame**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
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
