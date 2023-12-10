const part1Data = {
    sample: `.....
.S-7.
.|.|.
.L-J.
.....`,
    answer: 4,
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
    return input.split('\n');
};

/* 
https://en.wikipedia.org/wiki/Breadth-first_search
 1  procedure BFS(G, root) is
 2      let Q be a queue
 3      label root as explored
 4      Q.enqueue(root)
 5      while Q is not empty do
 6          v := Q.dequeue()
 7          if v is the goal then
 8              return v
 9          for all edges from v to w in G.adjacentEdges(v) do
10              if w is not labeled as explored then
11                  label w as explored
12                  w.parent := v
13                  Q.enqueue(w)
*/
const getLoop = (tiles, start) => {
    const queue = [];
    const visited = new Set();
    const [row, col] = start;

    const key = `${row}-${col}`;
    visited.add(key);

    queue.push(key);

    while (queue.length > 0) {
        const currentKey = queue.shift();
        const [row, col] = currentKey.split('-').map(Number);

        const neighbors = getNeighbors(tiles, row, col);
        for (let neighbor of neighbors) {
            // console.log(neighbor);
            const [char, row, col] = neighbor
                .split(' ')
                .map((part, i) => (i === 0 ? part : Number(part)));
            console.log({ char, row, col });
        }
    }
};

const getNeighbors = (tiles, row, col) => {
    const maxRow = tiles.length - 1;
    const maxCol = tiles[0].length - 1;
    const neighbors = [];

    // up
    if (row - 1 >= 0) {
        neighbors.push(`${tiles[row - 1][col]} ${row - 1} ${col}`);
    }

    // down
    // console.log(maxRow, row + 1);
    if (row + 1 <= maxRow) {
        neighbors.push(`${tiles[row + 1][col]} ${row + 1} ${col}`);
    }

    // right
    if (col - 1 >= 0) {
        neighbors.push(`${tiles[row][col - 1]} ${row} ${col - 1}`);
    }

    // left
    if (col + 1 <= maxCol) {
        neighbors.push(`${tiles[row][col + 1]} ${row} ${col + 1}`);
    }

    return neighbors.filter((n) => !n.startsWith('.'));
};

const part1 = () => {
    const data = getData(1).map((line) => line.split(''));
    // console.log(data);
    const startRow = data.findIndex((line) => {
        return line.indexOf('S') > -1;
    });
    const startColumn = data[startRow].indexOf('S');
    // console.log(startRow, startColumn);
    getLoop(data, [startRow, startColumn]);
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
