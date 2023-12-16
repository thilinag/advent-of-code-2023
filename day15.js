const part1Data = {
    sample: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
    // sample: `HASH`,
    answer: 1320,
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
    return input.split(',');
};

const part1 = () => {
    const data = getData(1);
    let sum = 0;
    let currentValue = 0;
    for (const stringData of data) {
        stringData.split('').forEach((char) => {
            currentValue = ((currentValue + char.charCodeAt()) * 17) % 256;
        });
        sum += currentValue;
        currentValue = 0;
    }

    return sum;
};

const part2 = () => {
    const data = getData(2);
    const boxes = [];
    let currentValue = 0;
    for (const stringData of data) {
        const [label, operation, focalLength] =
            stringData.match(/([a-z]+)|(=|-)|(\d+)/g);
        label.split('').forEach((char) => {
            currentValue = ((currentValue + char.charCodeAt()) * 17) % 256;
        });

        if (operation === '=') {
            const availableIndex = !boxes[currentValue]
                ? -1
                : boxes[currentValue].findIndex((lens) => lens.label === label);
            if (availableIndex > -1) {
                // If there is already a lens in the box with the same label,
                // replace the old lens with the new lens: remove the old lens and
                // put the new lens in its place, not moving any other lenses in the box.
                boxes[currentValue][availableIndex].focalLength = focalLength;
            } else {
                // If there is not already a lens in the box with the same label,
                // add the lens to the box immediately behind any lenses already in the box.
                // Don't move any of the other lenses when you do this. If there aren't any
                // lenses in the box, the new lens goes all the way to the front of the box
                boxes[currentValue] = [
                    ...(boxes[currentValue] || []),
                    { label, focalLength },
                ];
            }
        } else {
            // go to the relevant box and remove the lens with the given label if it is
            // present in the box. Then, move any remaining lenses as far forward in the
            // box as they can go without changing their order, filling any space made by
            // removing the indicated lens. (If no lens in that box has the given label,
            // nothing happens.)
            if (boxes[currentValue]) {
                boxes[currentValue] = boxes[currentValue].filter(
                    (lens) => lens.label !== label,
                );
            }
        }

        currentValue = 0;
    }

    return boxes.reduce(
        (sum, box, boxIndex) =>
            sum +
            box.reduce(
                (boxSum, lens, slot) =>
                    boxSum +
                    (boxIndex + 1) * (slot + 1) * Number(lens.focalLength),
                0,
            ),
        0,
    );
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
