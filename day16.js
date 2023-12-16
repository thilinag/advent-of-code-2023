const part1Data = {
    sample: String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
    answer: 46,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 51,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const getEnergizedCount = (matrix, start) => {
    const visited = new Set();
    visited.add(start.join());
    const queue = [start];
    const height = matrix.length;
    const width = matrix[0].length;

    while (queue.length) {
        const current = queue.shift();
        const [row, column, direction] = current;

        if (row >= 0 && row < height && column >= 0 && column < width) {
            visited.add(current.join());

            const next = getNext(matrix, row, column, direction);
            next.forEach((item) => {
                const key = item.join();
                if (!visited.has(key)) {
                    queue.push(item);
                }
            });
        } else {
            continue;
        }
    }

    return new Set([...visited].map((item) => item.slice(0, -2))).size;
};

const getNext = (data, row, column, direction) => {
    const current = data[row][column];
    switch (current) {
        case '\\': {
            switch (direction) {
                case 'R':
                    return [[row + 1, column, 'D']];
                case 'L':
                    return [[row - 1, column, 'U']];
                case 'D':
                    return [[row, column + 1, 'R']];
                case 'U':
                    return [[row, column - 1, 'L']];
            }
            break;
        }
        case '/': {
            switch (direction) {
                case 'R':
                    return [[row - 1, column, 'U']];
                case 'L':
                    return [[row + 1, column, 'D']];
                case 'D':
                    return [[row, column - 1, 'L']];
                case 'U':
                    return [[row, column + 1, 'R']];
            }
            break;
        }
        case '.': {
            switch (direction) {
                case 'R':
                    return [[row, column + 1, 'R']];
                case 'L':
                    return [[row, column - 1, 'L']];
                case 'U':
                    return [[row - 1, column, 'U']];
                case 'D':
                    return [[row + 1, column, 'D']];
            }
            break;
        }
        case '|': {
            switch (direction) {
                case 'R':
                case 'L':
                    return [
                        [row - 1, column, 'U'],
                        [row + 1, column, 'D'],
                    ];
                case 'U':
                    return [[row - 1, column, 'U']];
                case 'D':
                    return [[row + 1, column, 'D']];
            }
            break;
        }
        case '-': {
            switch (direction) {
                case 'R':
                    return [[row, column + 1, 'R']];
                case 'L':
                    return [[row, column - 1, 'L']];
                case 'U':
                case 'D':
                    return [
                        [row, column - 1, 'L'],
                        [row, column + 1, 'R'],
                    ];
            }
            break;
        }
    }
};

const part1 = () => {
    const data = getData(1).map((line) => line.split(''));

    return getEnergizedCount(data, [0, 0, 'R']);
};

const part2 = () => {
    const data = getData(2);
    let maxEnergizeCount = 0;
    const mapSize = data.length;

    data.forEach((_, i) => {
        const currentTopMaxEnergizeCount = getEnergizedCount(data, [0, i, 'D']);
        if (currentTopMaxEnergizeCount > maxEnergizeCount) {
            maxEnergizeCount = currentTopMaxEnergizeCount;
        }

        const currentBottomMaxEnergizeCount = getEnergizedCount(data, [
            mapSize - 1,
            i,
            'U',
        ]);
        if (currentBottomMaxEnergizeCount > maxEnergizeCount) {
            maxEnergizeCount = currentBottomMaxEnergizeCount;
        }

        const currentLeftMaxEnergizeCount = getEnergizedCount(data, [
            i,
            0,
            'R',
        ]);
        if (currentLeftMaxEnergizeCount > maxEnergizeCount) {
            maxEnergizeCount = currentLeftMaxEnergizeCount;
        }

        const currentRightMaxEnergizeCount = getEnergizedCount(data, [
            i,
            mapSize - 1,
            'L',
        ]);
        if (currentRightMaxEnergizeCount > maxEnergizeCount) {
            maxEnergizeCount = currentRightMaxEnergizeCount;
        }
    });

    return maxEnergizeCount;
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
