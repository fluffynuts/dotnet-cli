import { parseXml } from "./parse-xml";
import { readTextFile } from "yafs";

export async function readNuspecVersion(pathToNuspec: string) {
    const
        contents = await readTextFile(pathToNuspec),
        doc = await parseXml(contents);

    try {
        return doc.package.metadata[0].version[0];
    } catch (e) {
        throw new Error(
            `Unable to read xml node package/metadata/version in file ${ pathToNuspec }`
        );
    }
}
