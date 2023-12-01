// const input = ``; // sample input
const input = document.body.innerText.trim();
const data = input.split("\n");

const getCalibrationTotal = (values) => {
    return values.reduce(
        (sum, current) => sum + current.at(0) * 10 + current.at(-1),
        0
    );
};

const part1 = (data) => {
    const numbers = data.map((line) => line.match(/\d/g)?.map(Number) || [0]);
    return getCalibrationTotal(numbers);
};

const part2 = (data) => {
    const letterNumbers = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];

    // using matchAll with capture group since match only gives ['one'] for eg 'oneeight'
    // but we need ['one', 'eight'] for eg 'oneeight'
    // https://stackoverflow.com/a/33903830

    const numbers = data.map((line) =>
        [
            ...line.matchAll(
                /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
            ),
        ]
            .map((match) => match[1])
            .map((n) =>
                /\d/.test(n) ? Number(n) : letterNumbers.indexOf(n) + 1
            )
    );
    return getCalibrationTotal(numbers);
};

console.time("part1");
console.log(part1(data));
console.timeEnd("part1");
console.time("part2");
console.log(part2(data));
console.timeEnd("part2");
