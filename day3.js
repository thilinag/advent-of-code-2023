const part1Data = {
    sample: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
    answer: 4361,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 467835,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const getAdjacent = (engine, row, column, withLocation = false) => {
    const engineHeight = engine.length;
    const engineWidth = engine[0].length;

    const adjacent = [];

    for (
        let dx = row > 0 ? -1 : 0;
        dx <= (row < engineHeight - 1 ? 1 : 0);
        ++dx
    ) {
        for (
            var dy = column > 0 ? -1 : 0;
            dy <= (column < engineWidth - 1 ? 1 : 0);
            ++dy
        ) {
            if (dx != 0 || dy != 0) {
                const value = engine[row + dx][column + dy];

                if (value === '.') {
                    continue;
                }

                if (withLocation) {
                    // for part 2
                    adjacent.push(`${value}-${row + dx}-${column + dy}`);
                } else {
                    adjacent.push(value);
                }
            }
        }
    }

    return adjacent;
};

const hasAdjacentSymbols = (engine, row, column) => {
    return getAdjacent(engine, row, column).some((value) => !/\d/.test(value));
};

const part1 = () => {
    const data = getData(1);

    const engine = data.map((row) => row.split(''));
    const partNumbers = [];

    for (let row = 0; row < engine.length; row++) {
        let currentNumber = '';
        let isPartNumber = [];
        const columnCount = engine[row].length;
        for (let column = 0; column < columnCount; column++) {
            const currentChar = engine[row][column];

            if (!isNaN(currentChar)) {
                currentNumber += currentChar;
                isPartNumber.push(hasAdjacentSymbols(engine, row, column));
            }

            if (isNaN(currentChar) || column + 1 === columnCount) {
                if (isPartNumber.some((i) => i)) {
                    partNumbers.push(currentNumber);
                }

                currentNumber = '';
                isPartNumber = [];
            }
        }
    }

    return partNumbers.reduce((sum, current) => sum + Number(current), 0);
};

const part2 = () => {
    const data = getData(2);
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
