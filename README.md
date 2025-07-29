dotnet-cli
---
Provides wrappers around the common functions provided by the dotnet cli

This library was ejected from [zarro](https://github.com/fluffynuts/zarro) for
general-purpose usage


usage
---

`dotnet-cli` exports a collection of functions wrapping around `system-wrapper`,
using the `dotnet` cli. Functions that return a `SystemResult` may also throw
a `SystemError` if the dotnet command fails. Both `SystemResult` and `SystemError`
contain the captured stderr and stdout from the process so you can diagnose issues.

Available functions:

```javascript
listPackages(csproj: string): Promise<DotNetPackageReference[]>;
publish(opts: DotNetPublishOptions): Promise<SystemResult>;
clean(opts: DotNetCleanOptions): Promise<SystemResult>;
build(opts: DotNetBuildOptions): Promise<SystemResult>;
test(opts: DotNetTestOptions): Promise<SystemResult>;
incrementTempDbPortHintIfFound(env: Dictionary<string> | undefined): void;
listNugetSources(): Promise<NugetSource[]>;
addNugetSource(opts: NugetAddSourceOptions): Promise<SystemResult>;
removeNugetSource(source: string | NugetSource): Promise<void>;
enableNugetSource(source: string | NugetSource): Promise<SystemResult>;
disableNugetSource(source: string | NugetSource): Promise<SystemResult>;
tryFindConfiguredNugetSource(find: string | Partial<NugetSource> | RegExp): Promise<Optional<NugetSource>>;
removeNugetSourceByName(find: string | Partial<NugetSource> | RegExp): Promise<SystemResult>;
pack(opts: DotNetPackOptions): Promise<SystemResult>;
nugetPush(opts: DotNetNugetPushOptions): Promise<SystemResult | void>;
resolveContainerOptions(opts: DotNetPublishOptions): Promise<ResolvedContainerOption[]>;
searchPackages(options: DotNetSearchPackagesOptions | string): Promise<PackageInfo[]>;
searchPackagesUncached(opts: DotNetSearchPackagesOptions): Promise<PackageInfo[]>;
installPackage(opts: DotNetInstallNugetPackageOptions): Promise<SystemResult>;
create(opts: DotNetCreateOptions): Promise<string>;
addProjectToSolution(opts: DotNetAddProjectToSolutionOptions): Promise<void>;
listProjects(solutionFile: string): Promise<string[]>;
upgradePackages(opts: DotNetUpgradePackagesOptions): Promise<void>;
clearCaches(cacheType: DotNetCache | string): Promise<void>;
run(opts: DotNetRunProjectOptions): Promise<SystemResult>;
restore(opts: DotNetRestoreOptions): Promise<SystemResult>

// also:
// provide custom logger functions (log and warn) to capture logs
//    instead of outputting them
configureLoggers(customLoggers: Loggers);
// reset to default loggers (console.log, console.warn)
resetLoggers();
```

Examples:

1. build
```typescript
import { build } from "dotnet-cli";

await build({
    target: "path/to/project-or-solution",
    configuration: "Release"
});
```

2. test
```typescript
import { test } from "dotnet-cli";

await test({
    target: "path/to/test-project-or-solution",
    configuration: "Debug",
    // optional logger config
    loggers: {
        "quackers": "normal"
    }
});
```
