import * as realSystem from "system-wrapper";
import { SystemResult } from "system-wrapper";
import * as realUpdateNuspecVersion from "../src/update-nuspec-version";

export const system = jest.fn();
export const systemPre = jest.fn();
jest.doMock("system-wrapper", () => {
    return {
        system,
        quoteIfRequired: realSystem.quoteIfRequired
    };
});
export const updateNuspecVersion = jest.fn();
export const updateNuspecVersionPre = jest.fn();
jest.doMock("../src/update-nuspec-version", () => {
    return {
        updateNuspecVersion
    };
});

export function mockUpdatePackageNuspec() {
    updateNuspecVersion.mockImplementation(async (fileOrXml: string, newVersion: string) => {
        updateNuspecVersionPre(fileOrXml, newVersion);
        return realUpdateNuspecVersion.updateNuspecVersion(fileOrXml, newVersion);
    });
}

(system as any).isError = (o: any) => o && !!o.exitCode;
(system as any).isResult = (o: any) => o && o.exitCode === 0;

let shouldBypassSystemMock = false;

const history = [] as SystemResult[];

export function fetchHistory() {
    return history.splice(0);
}

export function mockSystem() {
    history.splice(0);
    system.mockImplementation((exe, args, opts) => {
        systemPre(exe, args, opts);
        if (shouldBypassSystemMock) {
            return realSystem.system(exe, args, opts);
        }
        if (args[0] === "nuget" && args[1] === "list" && args[2] === "source") {
            return {
                stdout: [
                    "Registered Sources:",
                    "  1.  nuget.org [Enabled]",
                    "      https://api.nuget.org/v3/index.json",
                    "  2.  custom [Enabled]",
                    "      https://nuget.custom-domain.com/nuget",
                    "  3.  Microsoft Visual Studio Offline Packages [Disabled]",
                    "      C:\\Program Files (x86)\\Microsoft SDKs\\NuGetPackages\\"
                ],
                stderr: [] as string[],
                exitCode: 0,
                args: [ "list" ],
                exe: "nuget.exe"
            } as SystemResult;
        }
        const result = {
            exe,
            args,
            exitCode: 0,
            __is_mocked__: true
        } as unknown as SystemResult;
        history.push(result);
        return Promise.resolve(result);
    });
}

export function enableSystemCallThrough() {
    shouldBypassSystemMock = true;
}

export function disableSystemCallThrough() {
    shouldBypassSystemMock = false;
}

export const anything = expect.any(Object);

export const packageNuspec = `
  <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<package>
  <metadata>
    <id>NExpect.Matchers.AspNetCore</id>
    <version>1.0.158</version>
    <title>NExpect.Matchers.AspNetCore</title>
    <authors>Davyd McColl</authors>
    <owners>Davyd McColl</owners>
    <description>&#xD;&#xD;&#xD;&#xD;&#xD;
        ASP.Net core extensions for NExpect&#xD;&#xD;&#xD;&#xD;&#xD;
    </description>
    <releaseNotes>&#xD;&#xD;&#xD;&#xD;&#xD;
    </releaseNotes>
    <summary>&#xD;&#xD;&#xD;&#xD;&#xD;
      NExpect Provides Expect() syntax for doing assertions in .NET. Framework-agnostic, throwing&#xD;&#xD;&#xD;&#xD;&#xD;
      UnmetExpectationExceptions for failures. Assertion exception type can be overridden at run-time.&#xD;&#xD;&#xD;&#xD;&#xD;
      NExpect has grammar inspired by Chai and extensibility inspired by Jasmine.&#xD;&#xD;&#xD;&#xD;&#xD;
      &#xD;&#xD;&#xD;&#xD;&#xD;
      This library adds ASP.Net core extensions for NExpect so you can test your&#xD;&#xD;&#xD;&#xD;&#xD;
      [Route] and [Http*] annotations like so:&#xD;&#xD;&#xD;&#xD;&#xD;
      \`\`\`&#xD;&#xD;&#xD;&#xD;&#xD;
      Expect(typeof(SomeController)&#xD;&#xD;&#xD;&#xD;&#xD;
      .To.Have.Method(nameof(SomeController.MethodName))&#xD;&#xD;&#xD;&#xD;&#xD;
      .Supporting(HttpMethod.Delete)&#xD;&#xD;&#xD;&#xD;&#xD;
      .And(HttpMethod.Post)&#xD;&#xD;&#xD;&#xD;&#xD;
      .With.Route("first-route")&#xD;&#xD;&#xD;&#xD;&#xD;
      .And.Route("second-route");&#xD;&#xD;&#xD;&#xD;&#xD;
      \`\`\`&#xD;&#xD;&#xD;&#xD;&#xD;
    </summary>
    <language>en-US</language>
    <projectUrl>https://github.com/fluffynuts/NExpect</projectUrl>
    <icon>icon.png</icon>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <license type="expression">BSD-3-Clause</license>
    <copyright>Copyright 2019</copyright>
    <dependencies>
      <group targetFramework="net452">
        <dependency id="NExpect" version="1.0.159"/>
        <dependency id="Microsoft.AspNetCore.Mvc.Core" version="4.1.0"/>
      </group>
      <group targetFramework="netstandard2.0">
        <dependency id="NExpect" version="1.0.159"/>
        <dependency id="Microsoft.AspNetCore.Mvc.Core" version="4.1.0"/>
      </group>
    </dependencies>
    <references/>
    <tags/>
  </metadata>
  <files>
    <file src="icon.png" target="" />
    <file src="bin\\BuildForRelease\\netstandard2.0\\NExpect.Matchers.AspNetCore.xml" target="lib\\net452"/>
    <file src="bin\\BuildForRelease\\netstandard2.0\\NExpect.Matchers.AspNetCore.dll" target="lib\\netstandard2.0"/>
    <file src="bin\\BuildForRelease\\netstandard2.0\\NExpect.Matchers.AspNetCore.xml" target="lib\\netstandard2.0"/>
    <file src="bin\\BuildForRelease\\netstandard2.0\\NExpect.Matchers.AspNetCore.pdb" target="lib\\netstandard2.0"/>
    <file src="bin\\BuildForRelease\\netstandard2.0\\NExpect.Matchers.AspNetCore.deps.json" target="lib\\netstandard2.0"/>
  </files>
</package>
  `;

export type AsyncVoidVoid = () => Promise<void>;

export async function runWithRealSystem(
    fn: AsyncVoidVoid
): Promise<void> {
    const oldMockBypass = shouldBypassSystemMock;
    shouldBypassSystemMock = true;
    try {
        await fn();
    } catch (e) {
        throw e;
    } finally {
        shouldBypassSystemMock = oldMockBypass;
    }

}

export function noop(...args: any[]) {
    /* intentionally left blank */
}
