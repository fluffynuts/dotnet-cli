import { parseXml } from "./parse-xml";
import * as path from "path";
import { readTextFile } from "yafs";
import type { Optional } from "system-wrapper";

const fallbackAssemblyVersion = "1.0.0";

export async function readProjectVersion(pathToCsProj: string): Promise<Optional<string>> {
    return readCsProjProperty(
        pathToCsProj,
        "Version",
        fallbackAssemblyVersion
    );
}

export async function readPackageVersion(pathToCsProj: string) {
    return readCsProjProperty(
        pathToCsProj,
        "PackageVersion",
        fallbackAssemblyVersion
    );
}

export async function readAssemblyVersion(pathToCsProj: string): Promise<string> {
    const result = await readCsProjProperty(
        pathToCsProj,
        "AssemblyVersion",
        fallbackAssemblyVersion
    );
    return result ?? fallbackAssemblyVersion;
}

export function determineAssemblyNameFromProjectPath(
    pathToCsProj: string
): string {
    const
        basename = path.basename(pathToCsProj);
    return basename.replace(/\.csproj$/i, "");
}

export async function readAssemblyName(pathToCsProj: string) {
    return await readCsProjProperty(
        pathToCsProj,
        "AssemblyName",
        async () => determineAssemblyNameFromProjectPath(pathToCsProj)
    );
}

function readTextFrom(node: string[]): string | undefined {
    return node
        ? node[0]
        : undefined;
}

function tryReadNodeFrom(
    groups: any[],
    nodeName: string
): string | undefined {
    return groups.reduce(
        (acc: string | undefined, cur: any) =>
            acc || readTextFrom(cur[nodeName]),
        undefined
    );
}

export async function readCsProjProperty(
    pathToCsProj: string,
    property: string,
    fallback?: string | (() => Promise<string>)
): Promise<Optional<string>> {
    const
        contents = await readTextFile(pathToCsProj),
        doc = await parseXml(contents);

    try {
        const
            propertyGroups = doc.Project.PropertyGroup;
        const result = tryReadNodeFrom(propertyGroups, property);
        if (!!result) {
            return result;
        }
        return await resolveFallback(fallback);
    } catch (e) {
        return await resolveFallback();
    }
}

async function resolveFallback(
    fallback?: string | (() => Promise<string>)
) {
    if (fallback === undefined) {
        return undefined;
    }
    if (typeof fallback === "string") {
        return fallback;
    }
    return await fallback();
}
