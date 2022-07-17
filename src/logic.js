import {
  changeAllTilesOfValue,
  cloneGrid,
  printGrid,
  printStats,
  valueDownOfHead,
  valueLeftOfHead,
  valueRightOfHead,
  valueUpOfHead,
} from "./utils.js";
import { floodFill } from "./floodFill.js";

function getDefaultGrid(width, height) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}

function joinGrids(grid1, grid2) {
  const grid = [];
  for (let i = 0; i < grid1.length; i++) {
    const row = [];
    for (let j = 0; j < grid1[i].length; j++) {
      if (grid1[i][j] < 0 && grid2[i][j] < 0) {
        row.push(Math.min(grid1[i][j], grid2[i][j]));
      } else {
        row.push(grid1[i][j] * grid2[i][j]);
      }
    }
    grid.push(row);
  }
  return grid;
}

function getDirection(grid, x, y) {
  let bestDirection = "";
  let highestValue = -1;
  if (x > 0 && grid[y][x - 1] >= highestValue) {
    bestDirection = "left";
    highestValue = grid[y][x - 1];
  }
  if (x < 10 && grid[y][x + 1] >= highestValue) {
    bestDirection = "right";
    highestValue = grid[y][x + 1];
  }
  if (y > 0 && grid[y - 1][x] >= highestValue) {
    bestDirection = "down";
    highestValue = grid[y - 1][x];
  }
  if (y < 10 && grid[y + 1][x] >= highestValue) {
    bestDirection = "up";
    highestValue = grid[y + 1][x];
  }
  return bestDirection;
}

function evaluateFoodTiles(grid, gameState) {
  const cloneGrid = grid.slice();
  gameState.board.food.forEach((foodItem) => {
    grid[foodItem.y][foodItem.x] = 1;
  });
  return cloneGrid;
}

function evaluateCollisiontiles(grid, gameState) {
  const cloneGrid = grid.slice();
  const { snakes } = gameState.board;
  for (let i = 0; i < snakes.length; i++) {
    const snake = snakes[i];
    for (let j = 0; j < snake.body.length; j++) {
      const bodyPart = snake.body[j];
      grid[bodyPart.y][bodyPart.x] = -1;
    }
  }
  return cloneGrid;
}

export function move(gameState) {
  printStats(gameState);
  const myLength = gameState.you.length;
  const functions = [evaluateFoodTiles, evaluateCollisiontiles];
  console.log("MOVE");
  let grid = getDefaultGrid(gameState.board.width, gameState.board.height, 0);

  functions.forEach((func) => {
    const funcGrid = func(grid, gameState);
    grid = joinGrids(grid, funcGrid);
    // console.log("FUNC", func);
    // printGrid(funcGrid);
  });

  const myHead = gameState.you.head;

  let floods = 0;
  let Rnr, Lnr, Unr, Dnr;

  let gridToFloodFill = cloneGrid(grid).map((row) => {
    return row.map((c) => {
      if (c >= 0) return "N";
      return c;
    });
  });

  // printGrid(gridToFloodFill);
  const rightOfHead = valueRightOfHead(gridToFloodFill, myHead);
  if (
    rightOfHead !== undefined &&
    !["D", "U", "L", "R"].includes(rightOfHead) &&
    !(rightOfHead < 0)
  ) {
    const { numberOfTiles } = floodFill(
      gridToFloodFill,
      myHead.y,
      myHead.x + 1,
      "R"
    );
    Rnr = numberOfTiles;
    console.log("R GRID");
    floods++;
  }

  const leftOfHead = valueLeftOfHead(gridToFloodFill, myHead);
  if (
    leftOfHead !== undefined &&
    !["D", "U", "L", "R"].includes(leftOfHead) &&
    !(leftOfHead < 0)
  ) {
    const { numberOfTiles } = floodFill(
      gridToFloodFill,
      myHead.y,
      myHead.x - 1,
      "L"
    );
    Lnr = numberOfTiles;
    console.log("L GRID");
    floods++;
  }

  const upOfHead = valueUpOfHead(gridToFloodFill, myHead);
  if (
    upOfHead !== undefined &&
    !["D", "U", "L", "R"].includes(upOfHead) &&
    !(upOfHead < 0)
  ) {
    const { numberOfTiles } = floodFill(
      gridToFloodFill,
      myHead.y + 1,
      myHead.x,
      "U"
    );
    Unr = numberOfTiles;
    console.log("U GRID");
    floods++;
  }

  const downOfHead = valueDownOfHead(gridToFloodFill, myHead);
  if (
    downOfHead !== undefined &&
    !["D", "U", "L", "R"].includes(downOfHead) &&
    !(downOfHead < 0)
  ) {
    const { numberOfTiles } = floodFill(
      gridToFloodFill,
      myHead.y - 1,
      myHead.x,
      "D"
    );
    Dnr = numberOfTiles;
    console.log("D GRID");
    floods++;
  }

  if (floods > 1) {
    printGrid(grid);
    console.log(`${Rnr}.${Lnr}.${Unr}.${Dnr}`);
    printGrid(gridToFloodFill);
    if (Rnr < myLength) {
      const modifier = Rnr / myLength - 1;
      gridToFloodFill = changeAllTilesOfValue(gridToFloodFill, "R", modifier);
    }
    if (Lnr < myLength) {
      const modifier = Lnr / myLength - 1;
      gridToFloodFill = changeAllTilesOfValue(gridToFloodFill, "L", modifier);
    }
    if (Unr < myLength) {
      const modifier = Unr / myLength - 1;
      gridToFloodFill = changeAllTilesOfValue(gridToFloodFill, "U", modifier);
    }
    if (Dnr < myLength) {
      const modifier = Dnr / myLength - 1;
      gridToFloodFill = changeAllTilesOfValue(gridToFloodFill, "D", modifier);
    }
    printGrid(gridToFloodFill);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (typeof gridToFloodFill[i][j] === "number") {
          grid[i][j] = gridToFloodFill[i][j];
        }
      }
    }

    printGrid(grid);
  }

  const direction = getDirection(
    grid,
    gameState.you.head.x,
    gameState.you.head.y
  );
  const response = {
    move: direction,
  };
  return response;
}
