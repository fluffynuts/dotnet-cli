import "expect-even-more-jest";
import { faker } from "@faker-js/faker";
import { noColor, alwaysYellow } from "../src";

describe(`ansi-colors wrapper`, () => {
    const { spyOn } = jest;
    describe(`alwaysYellow`, () => {
        it(`should return a string and not log`, async () => {
            // Arrange
            spyOn(console, "log");
            // Act
            const result = alwaysYellow(faker.word.sample());
            // Assert
            expect(typeof result)
                .toEqual("string");
            expect(console.log)
                .not.toHaveBeenCalled();
        });
    });

    describe(`noColor`, () => {
        it(`should return a string and not log`, async () => {
            // Arrange
            spyOn(console, "log");
            // Act
            const result = noColor(faker.word.sample());
            // Assert
            expect(typeof result)
                .toEqual("string");
            expect(console.log)
                .not.toHaveBeenCalled();
        });
    });
});
