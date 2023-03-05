import { ParseBag } from '../../Parser';
import { Script } from '../Script';

/**
 * **SoundTimelineScript**
 *
 * TODO: Document. -Jab, 3/5/2023
 *
 * @author Jab
 */
export class SoundTimelineScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=');
    }
}
