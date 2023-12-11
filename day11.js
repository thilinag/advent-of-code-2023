const part1Data = {
    sample: `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`,
    answer: 374,
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

const part1 = () => {
    const data = getData(1).map((line) => line.split(''));
    const emptyRows = [];
    const emptyCols = [];
    const galaxies = [];

    // find empty columns
    data[0].forEach((_, column) => {
        let isEmpty = true;
        data.forEach((row) => {
            if (row[column] === '#') {
                isEmpty = false;
            }
        });

        if (isEmpty) {
            emptyCols.push(column);
        }
    });

    // find empty rows, find empty galaxies
    data.forEach((row, i) => {
        if (row.every((point) => point === '.')) {
            emptyRows.push(i);
        }
        row.forEach((column, j) => {
            if (column === '#') {
                galaxies.push([i, j]);
            }
        });
    });

    // store distances here
    const galaxyDistances = new Map();

    for (let i = 0; i < galaxies.length; i++) {
        for (let j = 0; j < galaxies.length; j++) {
            // skip same galaxy
            if (i === j) {
                continue;
            }

            const key = `${Math.min(i, j)}-${Math.max(i, j)}`;

            // skip already stored galaxy
            if (galaxyDistances.has(key)) {
                continue;
            }

            // shortest path is manhattan + empty galaxy count
            const minRow = Math.min(galaxies[i][0], galaxies[j][0]);
            const maxRow = Math.max(galaxies[i][0], galaxies[j][0]);
            const minColumn = Math.min(galaxies[i][1], galaxies[j][1]);
            const maxColumn = Math.max(galaxies[i][1], galaxies[j][1]);

            const emptyColsCount = emptyCols.filter(
                (col) => col < maxColumn && col > minColumn,
            ).length;
            const emptyRowsCount = emptyRows.filter(
                (row) => row < maxRow && row > minRow,
            ).length;

            galaxyDistances.set(
                key,
                maxRow -
                    minRow +
                    maxColumn -
                    minColumn +
                    emptyColsCount +
                    emptyRowsCount,
            );
        }
    }

    return [...galaxyDistances.values()].reduce((sum, dist) => sum + dist, 0);
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
