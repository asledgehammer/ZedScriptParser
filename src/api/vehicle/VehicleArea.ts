import { getFloat, getString, Script } from '../Script';
import { ParseBag } from '../../Parser';

export type XYWH = { x: number; y: number; w: number; h: number };

export class VehicleArea extends Script {
    xywh: XYWH | undefined;

    constructor(bag: ParseBag) {
        super(bag, '=', false);
        this.parse(bag);
    }

    onPropertyToken(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase().trim()) {
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase().trim()) {
            case 'xywh':
                const [x, y, w, h] = getString(value)
                    .split(' ')
                    .map((o) => {
                        return getFloat(o.trim());
                    });
                this.xywh = { x, y, w, h };
                return true;
        }
        return false;
    }
}
