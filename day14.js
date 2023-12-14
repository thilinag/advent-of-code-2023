const part1Data = {
    sample: `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`,
    answer: 136,
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
    const stackTop = new Map();
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const rock = data[i][j];
            switch (rock) {
                case 'O': {
                    const rockPosition = stackTop.get(j)
                        ? stackTop.get(j) - 1
                        : data.length;
                    stackTop.set(j, rockPosition);
                    count += rockPosition;
                    break;
                }
                case '#': {
                    stackTop.set(j, data.length - i);
                    break;
                }
            }
        }
    }

    return count;

    // part 1 code
    // return ;
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
