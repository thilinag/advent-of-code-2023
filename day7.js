const part1Data = {
    sample: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
    answer: 6440,
};

const part2Data = {
    sample: ``,
    answer: 0,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const strength = [
    'A',
    'K',
    'Q',
    'J',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
];

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const getType = (handData) => {
    const handDataLength = Object.entries(handData).length;

    switch (handDataLength) {
        case 5:
            return 1; // High card
        case 4:
            return 2; // One pair
        case 1:
            return 7; // Five of a kind
        case 2:
            return Object.values(handData).includes(4) ? 6 : 5; // Four of a kind or Full house
        case 3:
            return Object.values(handData).includes(3) ? 4 : 3; // Three of a kind or Two pair
    }
};

const part1 = () => {
    const data = getData(1).map((line) => {
        const [hand, bid] = line.split(' ');
        const handData = {};

        hand.split('').forEach((card) => {
            handData[card] = handData[card] ? handData[card] + 1 : 1;
        });

        return {
            type: getType(handData),
            hand,
            bid: Number(bid),
        };
    });

    const orderedHands = data.sort((a, b) => {
        if (a.type > b.type) {
            return 1;
        }

        if (a.type === b.type) {
            let strengthOrder;
            for (let i = 0; i < a.hand.length; i++) {
                if (
                    strength.indexOf(a.hand[i]) !== strength.indexOf(b.hand[i])
                ) {
                    strengthOrder =
                        strength.indexOf(b.hand[i]) -
                        strength.indexOf(a.hand[i]);
                    break;
                }
            }
            return strengthOrder;
        }

        return -1;
    });

    return orderedHands.reduce(
        (total, hand, i) => total + hand.bid * (i + 1),
        0,
    );
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
