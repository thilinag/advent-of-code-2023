const part1Data = {
    sample: `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`,
    answer: 62,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 952408144115,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

// Shoelace algorithm
// https://en.wikipedia.org/wiki/Shoelace_formula
const getArea = (polygon) => {
    let area = 0;
    for (let i = 0; i < polygon.length; i++) {
        const [x1, y1] = polygon[i];
        const [x2, y2] = polygon[(i + 1) % polygon.length];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area) / 2;
};

const part1 = () => {
    const data = getData(1).map((line) => line.split(' '));
    const polygon = [];
    let currentRow = 0;
    let currentColumn = 0;
    let edgeCount = 0;

    for (const [direction, countString] of data) {
        const count = Number(countString);

        switch (direction) {
            case 'R':
                currentColumn += count;
                break;
            case 'L':
                currentColumn -= count;
                break;
            case 'D':
                currentRow += count;
                break;
            case 'U':
                currentRow -= count;
                break;
        }
        edgeCount += count;
        polygon.push([currentRow, currentColumn]);
    }

    // area covered = inside area + edges
    return getArea(polygon) + edgeCount / 2 + 1;
};

const part2 = () => {
    const data = getData(2).map((line) => line.split(' '));
    const polygon = [];
    let currentRow = 0;
    let currentColumn = 0;
    let edgeCount = 0;
    const directions = ['R', 'D', 'L', 'U'];

    for (const [_, __, hex] of data) {
        const [_, countString, directionString] =
            hex.match(/(\(#)|(.{5})|(\d)/g);
        const count = parseInt(countString, 16);
        const direction = directions[directionString];

        switch (direction) {
            case 'R':
                currentColumn += count;
                break;
            case 'L':
                currentColumn -= count;
                break;
            case 'D':
                currentRow += count;
                break;
            case 'U':
                currentRow -= count;
                break;
        }
        edgeCount += count;
        polygon.push([currentRow, currentColumn]);
    }

    // area covered = inside area + edges
    return getArea(polygon) + edgeCount / 2 + 1;
};

console.time('part1');
const part1Answer = part1();
console.log({ part1: part1Answer });
console.timeEnd('part1');
if (!isBrowser)
    console.assert(
        part1Answer === part1Data.answer,
        `${part1Data.answer} expected.`,
    );

console.time('part2');
const part2Answer = part2();
console.log({ part2: part2Answer });
console.timeEnd('part2');
if (!isBrowser)
    console.assert(
        part2Answer === part2Data.answer,
        `${part2Data.answer} expected.`,
    );
