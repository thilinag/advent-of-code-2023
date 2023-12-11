const part1Data = {
    sample: `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`,
    answer: 4,
};

const part2Data = {
    sample: ``,
    answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const getLoopLength = (tiles, start) => {
    const queue = [];
    let count = 0;

    queue.push(start);

    while (queue.length > 0) {
        const currentKey = queue.shift();
        const [row, col, prevRow, prevCol] = currentKey;

        if (count > 0 && tiles[row][col] === 'S') break;

        const next = getNext(tiles, row, col, prevRow, prevCol);
        queue.push(next);
        count++;
    }
    return count;
};

const getNext = (tiles, row, col, prevRow, prevCol) => {
    const current = tiles[row][col];
    switch (current) {
        case 'S':
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
            return [
                prevRow === row ? row - 1 : row,
                prevRow === row ? col : col + 1,
                row,
                col,
            ];
        }
        case 'J': {
            return [
                prevRow === row ? row - 1 : row,
                prevRow === row ? col : col - 1,
                row,
                col,
            ];
        }
        case '7': {
            return [
                prevRow === row ? row + 1 : row,
                prevRow === row ? col : col - 1,
                row,
                col,
            ];
        }

        case 'F': {
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
    const loopLength = getLoopLength(data, [startRow, startColumn]);
    return loopLength / 2;
};

const part2 = () => {
    const data = getData(2);
    // part 2 code
    // return ;
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
