export function resolveEnvNumber(
    envVar: string,
    defaultValue: number
) {
    const envValue = process.env[envVar] as string;
    const parsed = parseInt(envValue, 10);
    return isNaN(parsed)
        ? defaultValue
        : parsed;
}

const positives = new Set<string>(["yes", "y", "true", "t", "1"]);
const negatives = new Set<string>(["no", "n", "false", "f", "0"]);

export function resolveEnvFlag(
    envVar: string,
    defaultValue: boolean
): boolean {
    const envValue = process.env[envVar];
    if (!envValue) {
        return defaultValue;
    }
    const lowerValue = `${envValue}`.toLowerCase();
    if (positives.has(lowerValue)) {
        return true;
    }
    if (negatives.has(lowerValue)) {
        return false;
    }
    throw new Error(`Unable to resolve environment value to flag: '${envVar}' => '${envValue}'`);
}
