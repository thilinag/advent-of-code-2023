const part1Data = {
    sample: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
    answer: 405,
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
    return input.split('\n\n');
};

const rotateMatrix = (matrix) => {
    return matrix[0].split('').map((_, index) => {
        return matrix
            .map((row) => row[index])
            .reverse()
            .join('');
    });
};

const getReflectionResult = (pattern, isHorizontal = false) => {
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === pattern[i + 1]) {
            const shortSide = Math.min(i, pattern.length - (i + 2));
            let isHorizontalMirror;
            isHorizontalMirror = true;
            for (let j = 1; j <= shortSide; j++) {
                if (pattern[i + j + 1] !== pattern[i - j]) {
                    isHorizontalMirror = false;
                }
            }

            if (isHorizontalMirror) {
                return (i + 1) * (isHorizontal ? 100 : 1);
            }
        }
    }
};

const part1 = () => {
    const data = getData(1).map((pattern) => pattern.split('\n'));

    return data
        .map((pattern) => {
            const horizontalReflectionResult = getReflectionResult(
                pattern,
                true,
            );

            if (horizontalReflectionResult) {
                return horizontalReflectionResult;
            } else {
                return getReflectionResult(rotateMatrix(pattern));
            }
        })
        .reduce((sum, c) => sum + c, 0);
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
