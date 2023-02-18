import { Fixer } from './Fixer';

export class FixerSkill {
    readonly skill: string;
    readonly level: number;

    constructor(skill: string, level: number) {
        this.skill = skill;
        this.level = level;
    }
}
