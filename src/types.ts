import { type Dictionary, type Optional } from "system-wrapper";
import { type Version } from "./version";

export interface DotNetMsBuildOptionsWithTargetAndConfigurations extends DotNetMsBuildOptions {
    target: string;
    configuration?: string | string[];
}

export type TerminalLogger = "auto" | "off" | "on";

export interface DotNetCommonBuildOptions
    extends DotNetMsBuildOptionsWithTargetAndConfigurations {
    framework?: string;
    runtime?: string;
    output?: string;
    arch?: string;
    os?: string;
    disableBuildServers?: boolean;
    terminalLogger?: TerminalLogger;
}

export interface DotNetPublishContainerOptions {
    publishContainer?: boolean;
    containerImageTag?: string;
    containerRegistry?: string;
    containerImageName?: string;
}

export interface DotNetPublishOptions
    extends DotNetCommonBuildOptions,
        DotNetPublishContainerOptions {
    useCurrentRuntime?: boolean;
    manifest?: string;
    noBuild?: boolean;
    noRestore?: boolean;
    selfContained?: boolean;
    versionSuffix?: string;
    containerTag?: string;
    containerRegistry?: string;
    containerImageName?: string;
}

export interface DotNetPackOptions
    extends DotNetMsBuildOptionsWithTargetAndConfigurations {
    output?: string;
    noBuild?: boolean;
    includeSymbols?: boolean;
    includeSource?: boolean;
    noRestore?: boolean;
    versionSuffix?: string;
    nuspec?: string;
    /**
     * @description when the specified Package.nuspec is not
     * found and this flag is set, then pack() will silently
     * drop the option; otherwise an error will be thrown.
     */
    ignoreMissingNuspec?: boolean;
}

export interface DotNetBuildOptions
    extends DotNetCommonBuildOptions {
    noIncremental?: boolean;
    disableBuildServers?: boolean;
    selfContained?: boolean;
    noDependencies?: boolean;
    noRestore?: boolean;
    versionSuffix?: string;
}

export interface DotNetCleanOptions
    extends DotNetMsBuildOptionsWithTargetAndConfigurations {
    framework?: string;
    runtime?: string;
    output?: string;
}

export interface DotNetRunProjectOptions
    extends DotNetMsBuildOptionsWithTargetAndConfigurations {
    framework?: string;
    runtime?: string;
    launchProfile?: string;
    noLaunchProfile?: boolean;
    noBuild?: boolean;
    interactive?: boolean;
    noRestore?: boolean;
    selfContained?: boolean;
    noSelfContained?: boolean;
    os?: string;
    disableBuildServers?: boolean;
    artifactsPath?: string;
    args?: string[];
}

export interface DotNetRestoreOptions {
    target: string;
    disableBuildServers?: boolean;
    source?: string;
    packages?: string;
    useCurrentRuntime?: boolean;
    disableParallel?: boolean;
    configFile?: string;
    noHttpCache?: boolean;
    ignoreFailedSources?: boolean;
    force?: boolean;
    runtime?: string;
    noDependencies?: boolean;
    verbosity?: DotNetVerbosity;
    // TODO: can interactive mode be handled well?
    // interactive?: boolean;
    artifactsPath?: string;
    useLockFile?: boolean;
    lockedMode?: boolean;
    lockFilePath?: string;
    forceEvaluate?: boolean;
    arch?: string;
}

export interface DotNetNugetPushOptions
    extends DotNetMsBuildOptionsWithTargetAndConfigurations {
    apiKey?: string;
    symbolApiKey?: string;
    disableBuffering?: boolean;
    noSymbols?: boolean;
    skipDuplicates?: boolean;
    noServiceEndpoint?: boolean;
    forceEnglishOutput?: boolean;
    source?: string;
    symbolSource?: string;
    timeout?: number;
}

export interface DotNetSearchPackagesOptions
    extends DotNetMsBuildOptions {
    source?: Optional<string>;
    search?: string;
    take?: number;
    skip?: number;
    exactMatch?: boolean;
    preRelease?: boolean;
    configFile?: string;
    latestOnly?: boolean;
    /**
     * search results are typically cached in memory
     * for 1 minute. If you absolutely _must_ have
     * fresh data, set this to false
     */
    skipCache?: boolean;
}

export interface DotNetInstallNugetPackageOptions
    extends DotNetMsBuildOptions {
    id: string;
    projectFile: string;
    version?: string;
    framework?: string;
    noRestore?: boolean;
    source?: string;
    packageDirectory?: string;
    preRelease?: boolean;
}

export interface IoConsumers {
    stdout?: IoConsumer;
    stderr?: IoConsumer;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
}

export type IoConsumer = (d: string) => void;

export interface DotNetTestOptions
    extends DotNetCommonBuildOptions {
    noBuild?: boolean;
    noRestore?: boolean;
    loggers?: DotNetTestLoggers;
    settingsFile?: string;
    env?: Dictionary<string>;
    filter?: string;
    diagnostics?: string;
    label?: string;
}

export interface NugetSource {
    name: string;
    url: string;
    enabled: boolean;
}

export interface NugetAddSourceOptions {
    name: string;
    url: string;
    username?: string;
    password?: string;
    storePasswordInClearText?: boolean;
    validAuthenticationTypes?: string;
    configFile?: string;
    enabled?: boolean;
}

export interface DotNetPackageReference {
    id: string;
    version: string;
}

export interface ResolvedContainerOption {
    value: string;
    option: keyof DotNetPublishContainerOptions;
    usingFallback: boolean;
}

export interface DotNetCreateBaseOptions
    extends DotNetBaseOptions {
    output?: string;
    name: string;
    dryRun?: boolean;
    force?: boolean;
    skipTemplateUpdateCheck?: boolean;
    enableDiagnostics?: boolean;
}

export interface DotNetCreateOptions
    extends DotNetCreateBaseOptions {
    template: string;
    projectFile?: string;
}

export interface DotNetAddProjectToSolutionOptions
    extends DotNetBaseOptions {
    solutionFile: string;
    projectFile: string;
}

type StringOrRegex = string | RegExp;

export interface DotNetUpgradePackagesOptions {
    pathToProjectOrSolution: string;
    packages: StringOrRegex[];
    preRelease?: boolean;
    noRestore?: boolean;
    source?: string;
    /**
     * defaults to true
     */
    showProgress?: boolean;
    clearNugetHttpCache?: boolean;
}

enum DotNetCache {
    all = "all",
    httpCache = "http-cache",
    globalPackages = "global-packages",
    temp = "temp"
}

export type DotNetVerbosity =
    "q"
    | "quiet"
    | "m"
    | "minimal"
    | "n"
    | "normal"
    | "d"
    | "detailed"
    | "diag"
    | "diagnostic";

export type DotNetTestLoggers = Dictionary<Dictionary<string>>;

export interface DotNetBaseOptions
    extends IoConsumers {
    verbosity?: DotNetVerbosity | string;
    suppressStdIoInErrors?: boolean;
    suppressOutput?: boolean;
}

export interface DotNetMsBuildOptions
    extends DotNetBaseOptions {
    msbuildProperties?: Dictionary<string>;
    additionalArguments?: string[];

    env?: Dictionary<string>;
}

export interface PackageInfo {
    id: string;
    version: Version;
    source?: string;
}
