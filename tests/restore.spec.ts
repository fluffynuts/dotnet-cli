import "expect-even-more-jest";
import * as realSystem from "system-wrapper";

const systemMock = { ...realSystem, system: jest.fn() };
jest.doMock("system-wrapper", () => {
    return systemMock;
});
import { restore } from "../src";
import { Dictionary, SystemResult } from "system-wrapper";
import { faker } from "@faker-js/faker";
import { noop } from "./common";

describe(`dotnet-cli:restore`, () => {
    const { spyOn } = jest;
    const { anything, stringContaining } = expect;
    it(`should be exported as a function`, async () => {
        // Arrange
        // Act
        expect(restore)
            .toBeAsyncFunction();
        // Assert
    });

    it(`should throw when no options passed`, async () => {
        // Arrange
        // Act
        await expect((restore as any)())
            .rejects.toThrow(/no options/);
        // Assert
    });

    it(`should verify the target is set`, async () => {
        // Arrange
        // Act
        await expect(restore({ target: undefined } as any))
            .rejects.toThrow(/target was not specified/);
        // Assert
    });

    it(`should attempt to restore the project`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({ target });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target ],
                anything()
            );
        expect(console.log)
            .toHaveBeenCalledOnceWith(
                stringContaining("Restoring")
            );
    });

    it(`should use provided disable build servers setting`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            disableBuildServers: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--disable-build-servers" ],
                anything()
            );
    });

    it(`should use the provided source`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            source: expected
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--source", expected ],
                anything()
            );
    });

    it(`should use the provided packages folder`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            packages: expected
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--packages", expected ],
                anything()
            );
    });

    it(`should use the current runtime on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            useCurrentRuntime: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--use-current-runtime" ],
                anything()
            );
    });

    it(`should disable parallel processing on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            disableParallel: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--disable-parallel" ],
                anything()
            );
    });

    it(`should disable http cache on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            noHttpCache: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--no-http-cache" ],
                anything()
            );
    });

    it(`should ignore failed sources on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            ignoreFailedSources: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--ignore-failed-sources" ],
                anything()
            );
    });

    it(`should force on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            force: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--force" ],
                anything()
            );
    });

    it(`should ignore dependencies on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            noDependencies: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--no-dependencies" ],
                anything()
            );
    });

    it(`should use a lock file on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            useLockFile: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--use-lock-file" ],
                anything()
            );
    });

    it(`should use locked mode on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            lockedMode: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--locked-mode" ],
                anything()
            );
    });

    it(`should use force evaluation on demand`, async () => {
        // Arrange
        const target = faker.word.sample();
        // Act
        await restore({
            target,
            forceEvaluate: true
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--force-evaluate" ],
                anything()
            );
    });

    it(`should use the provided config file`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            configFile: expected
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--configfile", expected ],
                anything()
            );
    });

    it(`should use the provided runtime`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            runtime: expected
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--runtime", expected ],
                anything()
            );
    });

    it(`should use the provided verbosity`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            verbosity: expected as any
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--verbosity", expected ],
                anything()
            );
    });

    it(`should use the provided artifacts path`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            artifactsPath: expected as any
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--artifacts-path", expected ],
                anything()
            );
    });

    it(`should use the provided lock file path`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            lockFilePath: expected as any
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--lock-file-path", expected ],
                anything()
            );
    });

    it(`should use the provided arch`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            expected = faker.word.sample();

        // Act
        await restore({
            target,
            arch: expected as any
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                [ "restore", target, "--arch", expected ],
                anything()
            );
    });

    it(`should add msbuild properties`, async () => {
        // Arrange
        const
            target = faker.word.sample(),
            msbuildProperties: Dictionary<string> = {},
            propName = faker.word.sample(),
            propValue = faker.word.sample(),
            expectedArgs = [
                "restore", target,
                `-p:${propName}=${propValue}`
            ];
        msbuildProperties[propName] = propValue;
        // Act
        await restore({
            target,
            msbuildProperties
        });
        // Assert
        expect(systemMock.system)
            .toHaveBeenCalledOnceWith(
                "dotnet",
                expectedArgs,
                anything()
            );
    });

    beforeEach(() => {
        spyOn(console, "log").mockImplementation(noop);
        mockSystem();
    });

    function mockSystem() {
        systemMock.system
            .mockImplementation((exe, args, opts) => {
                return Promise.resolve(
                    SystemResult.create()
                        .withExe(exe)
                        .withArgs(args ?? [])
                        .withExitCode(0)
                        .withStdErr([])
                        .withStdOut([])
                        .build()
                );
            });
    }
});
