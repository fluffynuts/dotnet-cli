import { quoteIfRequired as q, Optional } from "system-wrapper";

export function pushIfSet(
    args: string[],
    value: Optional<string | number>,
    cliSwitch: string
) {
    if (value) {
        args.push(cliSwitch, q(`${ value }`));
    }
}

export function pushFlag(args: string[], value: Optional<boolean>, cliSwitch: string) {
    if (value) {
        args.push(cliSwitch);
    }
}
