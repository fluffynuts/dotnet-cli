import { resolveEnvFlag } from "../../src/env";

export function shouldSkipSlowNetworkTests() {
    return resolveEnvFlag(
        "SKIP_SLOW_NETWORK_TESTS",
        false
    );
}
