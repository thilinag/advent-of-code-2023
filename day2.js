const part1Data = {
    sample: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
    answer: 8,
};

const part2Data = {
    sample: part1Data.sample,
    answer: 2286,
};

const sampleData = [part1Data, part2Data];
const isBrowser = typeof window !== 'undefined';

const getData = (part) => {
    const input = isBrowser
        ? document.body.innerText.trim()
        : sampleData[part - 1].sample;
    return input.split('\n');
};

const part1 = () => {
    const data = getData(1);
    const MAX_RED = 12;
    const MAX_GREEN = 13;
    const MAX_BLUE = 14;

    const possibleGames = data.filter((game) =>
        game // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            .split(': ')[1] // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            .split('; ') // 3 blue, 4 red
            .every((turn) => {
                const {
                    red = 0,
                    green = 0,
                    blue = 0,
                } = Object.assign(
                    // merge individual colors to one Object
                    ...turn.split(', ').map((bag) => {
                        const [cubes, color] = bag.split(' ');
                        return {
                            [color]: Number(cubes),
                        };
                    }),
                );

                return red <= MAX_RED && green <= MAX_GREEN && blue <= MAX_BLUE;
            }),
    );

    // sum of the IDs of possible games
    return possibleGames.reduce(
        (sum, game) => sum + Number(game.split(':')[0].split(' ')[1]),
        0,
    );
};

const part2 = () => {
    const data = getData(2);

    const possibleGames = data.map((game) =>
        game // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            .split(': ')[1] // 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
            .split('; ') // 3 blue, 4 red
            .map((turn) =>
                Object.assign(
                    // merge individual colors to one Object
                    ...turn.split(', ').map((bag) => {
                        const [cubes, color] = bag.split(' ');
                        return {
                            [color]: Number(cubes),
                        };
                    }),
                ),
            )
            // find lowest possible game
            .reduce(
                (lowestPossibleGame, { red, green, blue }) => {
                    return {
                        red:
                            lowestPossibleGame.red < red
                                ? red
                                : lowestPossibleGame.red,
                        blue:
                            lowestPossibleGame.blue < blue
                                ? blue
                                : lowestPossibleGame.blue,
                        green:
                            lowestPossibleGame.green < green
                                ? green
                                : lowestPossibleGame.green,
                    };
                },
                { red: 0, blue: 0, green: 0 },
            ),
    );

    // The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together
    return possibleGames.reduce(
        (sum, game) => sum + game.red * game.blue * game.green,
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
