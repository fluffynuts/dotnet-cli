import ansiColors from "ansi-colors";

export function yellow(message: string) {
    return isSuppressed()
        ? noColor(message)
        : alwaysYellow(message);
}

export function alwaysYellow(message: string) {
    return ansiColors.yellow(message);
}

export function noColor(message: string) {
    return message;
}

function isSuppressed() {
    if (flag(process.env.FORCE_COLOR)) {
        return false;
    }
    return flag(
        process.env.NO_COLOR
    ) || !process.stdout.isTTY;
}

const truthy = new Set([ 1, true, "1" ]);

function flag(value: any): boolean {
    return truthy.has(value);
}
