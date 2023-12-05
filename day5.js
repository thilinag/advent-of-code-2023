const part1Data = {
    sample: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
    answer: 35,
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

const processAlmanac = (almanac, destination) => {
    if (almanac.length === 0) {
        return destination;
    }

    const nextPossibleSourceMap = almanac
        .at(0)
        .split('\n')
        .slice(1)
        .map((line) => {
            const [destinationStart, sourceStart, rangeLength] = line
                .split(' ')
                .map(Number);
            return {
                destinationStart,
                sourceStart,
                rangeLength,
            };
        })
        .find(({ sourceStart, rangeLength }) => {
            return (
                destination >= sourceStart &&
                destination <= sourceStart + rangeLength - 1
            );
        });

    const nextAlmanac = almanac.slice(1);

    return processAlmanac(
        nextAlmanac,
        nextPossibleSourceMap
            ? destination -
                  nextPossibleSourceMap.sourceStart +
                  nextPossibleSourceMap.destinationStart
            : destination,
    );
};

const part1 = () => {
    const data = getData(1);

    return Math.min(
        ...data
            .shift()
            .split(': ')[1]
            .split(' ')
            .map(Number)
            .map((seed) => processAlmanac(data, seed)),
    );

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
