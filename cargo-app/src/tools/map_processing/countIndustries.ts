import { Coordinates } from "@dbtypes/db/schema/Coordinates";
import type { Industry } from "@dbtypes/db/schema/Industry";
import type { IndustryType } from "@dbtypes/db/schema/IndustryType";

const countIndustries = (pixels: Array<Array<string>>, industries: Array<IndustryType>): Map<string, Industry[]> => {
    console.log("Processing map by counting industries ...")
    // console.log(pixels)
    // Make copy of array
    let pixelArray: string[][] = pixels.map((row) => [...row]);
    let returnValues: Map<string, Industry[]> = new Map();
    for (let i = 0; i < industries.length; i++) {
        let color: string = industries[i].hex.replace('#', '').toLowerCase();
        // console.log("Finding", industries[i].name, "(hex:", color, ")")
        let replacementColor = '000000ee';

        function floodFill(x: number, y: number, skippable: number): void {
            const queue = [[x, y, skippable]];
            const rows = pixelArray.length;
            const cols = pixelArray[0].length;
            const visited = new Set();

            while (queue.length > 0) {
                let [x, y, skippable] = queue.shift()!;
                if (x < 0 || x >= rows || y < 0 || y >= cols)
                    continue;
                if (visited.has(`${x},${y}`))
                    continue;
                if (pixelArray[x][y] !== color) {
                    if (skippable === 0)
                        continue;
                    else
                        skippable = skippable - 1;
                }

                pixelArray[x][y] = replacementColor;
                visited.add(`${x},${y}`);

                let xdirs = [-1, -1, 0, 1, 1, 1, 0, -1];
                let ydirs = [0, 1, 1, 1, 0, -1, -1, -1];
                for (let i = 0; i < xdirs.length; i++) {
                    queue.push([x + xdirs[i], y + ydirs[i], skippable]);
                }
            }
        }

        let inds: Industry[] = [];
        for (let x = 0; x < pixelArray.length; x++) {
            for (let y = 0; y < pixelArray[0].length; y++) {
                if (pixelArray[x][y] === color) {
                    floodFill(x, y, 4);
                    inds.push(new Industry(Math.random().toString(16).slice(2), industries[i], new Coordinates(y + 1, x + 1)));
                }
            }
        }
        returnValues.set(industries[i].name, inds);
    }
    // console.log('Found industries', returnValues)
    return returnValues;
};

export default countIndustries;