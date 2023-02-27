import { FixerSkill } from "./FixerSkill";

export type ScriptFixer = Fixer | undefined;
export type ScriptFixerArray = Fixer[] | undefined;

export class Fixer {
    readonly item: string;
    readonly amount: number;
    skills: FixerSkill[] | undefined;

    constructor(item: string, amount: number) {
        this.item = item;
        this.amount = amount;
    }
}
