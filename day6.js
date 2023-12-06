const part1Data = {
    sample: `Time:      7  15   30
Distance:  9  40  200`,
    answer: 288,
};

const part2Data = {
    sample: part1Data.sample,
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

const race = (times, records) => {
    return times
        .map((time, game) => {
            let winCount = 0;
            for (let i = 0; i < time; i++) {
                if ((time - i) * i > records[game]) {
                    winCount++;
                }
            }
            return winCount;
        })
        .reduce((sum, c) => sum * c, 1);
};

const part1 = () => {
    const data = getData(1);
    const [times, records] = data.map((line) =>
        line.split(':')[1].match(/\d+/g).map(Number),
    );

    return race(times, records);
};

const part2 = () => {
    const data = getData(2);
    const [times, records] = data.map((line) => [
        Number(line.split(':')[1].match(/\d+/g).join('')),
    ]);

    return race(times, records);
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
