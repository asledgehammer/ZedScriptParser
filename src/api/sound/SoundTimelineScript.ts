import { ParseBag } from '../parser';
import { Script } from './Script';

export class SoundTimelineScript extends Script {
    constructor(bag: ParseBag) {
        super(bag, '=');
    }

    onPropertyObject(bag: ParseBag, property: string): boolean {
        switch (property.toLowerCase()) {
        }
        return false;
    }

    onPropertyValue(property: string, value: string): boolean {
        switch (property.toLowerCase()) {
        }
        return false;
    }
}