const part1Data = {
    sample: `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`,
    answer: 114,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 2,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const processHistory = (history, part2 = false, last = []) => {
    last.push(history.at(part2 ? 0 : -1));
    const differences = history
        .map((n, i, arr) => {
            if (i === 0) return null;
            return n - arr[i - 1];
        })
        .filter((i) => i !== null);

    if (new Set(differences).size > 0) {
        return processHistory(differences, part2, last);
    }

    return last.reverse().reduce((sum, c) => (part2 ? c - sum : c + sum), 0);
};

const part1 = () => {
    const data = getData(1).map((line) => line.split(' ').map(Number));
    return data.reduce((sum, line) => sum + processHistory(line), 0);
};

const part2 = () => {
    const data = getData(2).map((line) => line.split(' ').map(Number));
    return data.reduce((sum, line) => sum + processHistory(line, true), 0);
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
