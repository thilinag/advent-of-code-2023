const part1Data = {
    sample: `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`,
    answer: 142,
};

const part2Data = {
    sample: `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`,
    answer: 2811,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const getCalibrationTotal = (values) => {
    return values.reduce(
        (sum, current) => sum + current.at(0) * 10 + current.at(-1),
        0,
    );
};

const part1 = () => {
    const data = getData(1);
    const numbers = data.map((line) => line.match(/\d/g)?.map(Number) || [0]);
    return getCalibrationTotal(numbers);
};

const part2 = () => {
    const data = getData(2);
    const letterNumbers = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
    ];

    // using matchAll with capture group since match only gives ['one'] for eg 'oneeight'
    // but we need ['one', 'eight'] for eg 'oneeight'
    // https://stackoverflow.com/a/33903830

    const numbers = data.map((line) =>
        [
            ...line.matchAll(
                /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g,
            ),
        ]
            .map((match) => match[1])
            .map((n) =>
                /\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1,
            ),
    );
    return getCalibrationTotal(numbers);
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
