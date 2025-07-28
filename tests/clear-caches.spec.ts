import "expect-even-more-jest";
import { system, disableSystemCallThrough, mockSystem, anything } from "./common";
import { clearCaches, DotNetCache } from "../src";

describe(`dotnet-cli:clearCaches`, () => {
    const { spyOn } = jest;
    [
        DotNetCache.httpCache,
        DotNetCache.temp
    ].forEach(cacheType => {
        it(`should be able to clear cache: ${cacheType}`, async () => {
            // Arrange
            mockSystem();
            disableSystemCallThrough();
            spyOn(console, "log");
            // Act
            await clearCaches(cacheType);
            // Assert
            expect(system)
                .toHaveBeenCalledOnceWith(
                    "dotnet", [ "nuget", "locals", `${cacheType}`, "--clear" ],
                    anything
                );
        });
    });
});
