const part1Data = {
    sample: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
    answer: 8,
};

const part2Data = {
    sample: `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
    answer: 10,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

// Shoelace formula
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

const getLoopData = (tiles, start, part2 = false) => {
    const queue = [];
    const turns = [];
    let count = 0;

    queue.push(start);

    while (queue.length > 0) {
        const currentKey = queue.shift();
        const [row, col, prevRow, prevCol] = currentKey;

        if (count > 0 && tiles[row][col] === 'S') break;

        const next = getNext(tiles, row, col, prevRow, prevCol, turns);
        queue.push(next);
        count++;
    }
    return part2 ? [turns, count] : count;
};

const getNext = (tiles, row, col, prevRow, prevCol, turns) => {
    const current = tiles[row][col];
    switch (current) {
        case 'S':
            turns.push([row, col]);
            return [
                ...getNeighbors(tiles, row, col)[0].split(' ').map(Number),
                row,
                col,
            ];
        case '|': {
            return [prevRow > row ? row - 1 : row + 1, col, row, col];
        }
        case '-': {
            return [row, prevCol > col ? col - 1 : col + 1, row, col];
        }
        case 'L': {
            turns.push([row, col]);
            return [
                prevRow === row ? row - 1 : row,
                prevRow === row ? col : col + 1,
                row,
                col,
            ];
        }
        case 'J': {
            turns.push([row, col]);
            return [
                prevRow === row ? row - 1 : row,
                prevRow === row ? col : col - 1,
                row,
                col,
            ];
        }
        case '7': {
            turns.push([row, col]);
            return [
                prevRow === row ? row + 1 : row,
                prevRow === row ? col : col - 1,
                row,
                col,
            ];
        }

        case 'F': {
            turns.push([row, col]);
            return [
                prevRow === row ? row + 1 : row,
                prevRow === row ? col : col + 1,
                row,
                col,
            ];
        }
    }
};

const getNeighbors = (tiles, row, col) => {
    const maxRow = tiles.length - 1;
    const maxCol = tiles[0].length - 1;
    const neighbors = [];

    // up
    if (row - 1 >= 0 && ['|', 'F', '7'].includes(tiles[row - 1][col])) {
        neighbors.push(`${row - 1} ${col}`);
    }

    // down
    if (row + 1 <= maxRow && ['|', 'J', 'L'].includes(tiles[row + 1][col])) {
        neighbors.push(`${row + 1} ${col}`);
    }

    // right
    if (col - 1 >= 0 && ['-', 'J', '7'].includes(tiles[row][col - 1])) {
        neighbors.push(`${row} ${col - 1}`);
    }

    // left
    if (col + 1 <= maxCol && ['-', 'F', 'L'].includes(tiles[row][col + 1])) {
        neighbors.push(`${row} ${col + 1}`);
    }

    // non dot neighbors
    return neighbors.filter((n) => {
        const [r, c] = n.split(' ');
        return tiles[r][c] !== '.';
    });
};

const part1 = () => {
    const data = getData(1).map((line) => line.split(''));
    const startRow = data.findIndex((line) => {
        return line.indexOf('S') > -1;
    });
    const startColumn = data[startRow].indexOf('S');
    const loopLength = getLoopData(data, [startRow, startColumn]);
    return loopLength / 2;
};

const part2 = () => {
    const data = getData(2).map((line) => line.split(''));
    const startRow = data.findIndex((line) => {
        return line.indexOf('S') > -1;
    });
    const startColumn = data[startRow].indexOf('S');
    const loopData = getLoopData(data, [startRow, startColumn], true);
    // Pick's theorem
    // https://en.wikipedia.org/wiki/Pick%27s_theorem
    // A = i + (b/2) - 1;
    // i = A - (b/2) + 1
    return getArea(loopData[0]) - loopData[1] / 2 + 1;
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
