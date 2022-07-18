export function printGrid(grid) {
  console.log("PRINTING GRID");
  grid
    .slice()
    .reverse()
    .forEach((row, i) => {
      if (row) {
        process.stdout.write(
          `${(grid.length - i - 1).toString().padStart(2, "0")}:|`
        );
        row.forEach((c) => {
          let str;
          if (typeof c === "number") {
            str = c.toFixed(2);
          }
          str = str.padStart(7, " ");
          process.stdout.write(`${str}|`);
        });
        process.stdout.write("\n\n");
      }
    });
}

export function printStats(gameState) {
  console.log(`[HEAD]: ${gameState.you.head.x}.${gameState.you.head.y}`);
  console.log(`[LENGTH]: ${gameState.you.length}`);
}

export function cloneGrid(grid) {
  return JSON.parse(JSON.stringify(grid));
}

export function changeAllTilesOfValue(grid, oldValue, newValue) {
  return grid.map((row) => row.map((c) => (c === oldValue ? newValue : c)));
}

export function valueLeftOfHead(grid, head) {
  if (head.x - 1 >= 0) {
    return grid[head.y][head.x - 1];
  }
  return -2;
}

export function valueRightOfHead(grid, head) {
  if (head.x + 1 < grid.length) {
    return grid[head.y][head.x + 1];
  }
  return -2;
}

export function valueDownOfHead(grid, head) {
  if (head.y - 1 >= 0) {
    return grid[head.y - 1][head.x];
  }
  return -2;
}

export function valueUpOfHead(grid, head) {
  if (head.y + 1 < grid.length) {
    return grid[head.y + 1][head.x];
  }
  return -2;
}

export function insertIntoGrid(grid, x, y, value) {
  if (x < 0 || x > grid.length - 1 || y < 0 || y > grid.length - 1) {
    return;
  }

  grid[y][x] = value;
}

export function getManhattanDist(x, y, tarX, tarY) {
  return Math.abs(tarX - x) + Math.abs(tarY - y);
}

export function getMaxManhattanDist(grid) {
  return getManhattanDist(0, 0, grid.length - 1, grid[0].length - 1);
}

export function getModifiersOfNeighbourTiles(grid, head) {
  return {
    up: valueUpOfHead(grid, head),
    down: valueDownOfHead(grid, head),
    right: valueRightOfHead(grid, head),
    left: valueLeftOfHead(grid, head),
  };
}

export function getSortedMoves(grid, head) {
  return Object.entries(getModifiersOfNeighbourTiles(grid, head))
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
}
