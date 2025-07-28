import { Parser } from "xml2js";

export function parseXml(data: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const parser = new Parser();
        parser.parseString(data, (err: Error | null, result: any) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}
