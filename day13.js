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
    sample: part1Data.sample,
    answer: 400,
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

const getReflectionResult = (pattern, isHorizontal = false, part2 = false) => {
    patternLoop: for (let i = 0; i < pattern.length; i++) {
        const currentLine = pattern[i];
        const nextLine = pattern[i + 1];

        if (!nextLine) continue;

        // check if pattern has a smudge
        let smudge = part2 && levenshteinDistance(currentLine, nextLine) === 1;

        // if either does not mirror or does not mirror with a smudge
        if (currentLine !== nextLine && !smudge) continue;

        const shortSide = Math.min(i, pattern.length - (i + 2));
        // check if other lins are mirroring
        for (let j = 1; j <= shortSide; j++) {
            const currentLine = pattern[i + j + 1];
            const nextLine = pattern[i - j];

            // we are only allowed to have one smudge
            if (smudge) {
                // if we already detected a smudge other lines should match otherwise bail
                if (currentLine !== nextLine) {
                    continue patternLoop;
                }
            } else {
                // detect smudge
                if (part2 && levenshteinDistance(currentLine, nextLine) === 1) {
                    smudge = true;
                } else if (currentLine !== nextLine) {
                    // bail if lines doesn't match
                    continue patternLoop;
                }
            }
        }

        // in part 2 check if have detected a smudge
        // horizontal mirroring needs row count before mirror * 100, vertical mirroring needs column count before mirror
        if (!part2 || smudge) {
            return (i + 1) * (isHorizontal ? 100 : 1);
        }
    }
};

// https://en.wikipedia.org/wiki/Levenshtein_distance
const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
                i === 0
                    ? j
                    : Math.min(
                          arr[i - 1][j] + 1,
                          arr[i][j - 1] + 1,
                          arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1),
                      );
        }
    }
    return arr[t.length][s.length];
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
    const data = getData(2).map((pattern) => pattern.split('\n'));
    // https://stackoverflow.com/questions/18050932/detect-differences-between-two-strings-with-javascript
    // https://en.wikipedia.org/wiki/Levenshtein_distance

    return data
        .map((pattern, index) => {
            const horizontalReflectionResult = getReflectionResult(
                pattern,
                true,
                true,
            );

            if (horizontalReflectionResult) {
                return horizontalReflectionResult;
            } else {
                return getReflectionResult(rotateMatrix(pattern), false, true);
            }
        })
        .reduce((sum, c) => sum + c, 0);
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
