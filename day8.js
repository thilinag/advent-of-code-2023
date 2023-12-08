const part1Data = {
    sample: `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`,
    answer: 6,
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

const part1 = () => {
    const data = getData(1);
    const [instructionsLine, networkLines] = data;
    const instructions = instructionsLine.split('');
    const network = Object.assign(
        {},
        ...networkLines.split('\n').map((line) => {
            const [key, L, R] = line.match(/([A-Z]{3})/g);
            return {
                [key]: {
                    L,
                    R,
                },
            };
        }),
    );

    let steps = 0;
    let nextStep = network['AAA'];
    while (true) {
        const instruction = instructions[steps % instructions.length];
        steps++;
        if (nextStep[instruction] === 'ZZZ') break;
        nextStep = network[nextStep[instruction]];
    }

    return steps;
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
