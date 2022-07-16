import { printGrid, printStats } from "./utils.js";

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
  let highestValue = 0;
  if (x > 0 && grid[y][x - 1] >= highestValue) {
    bestDirection = "left";
    console.log(grid[y][x - 1]);
    highestValue = grid[y][x - 1];
  }
  if (x < 10 && grid[y][x + 1] >= highestValue) {
    bestDirection = "right";
    console.log(grid[y][x + 1]);
    highestValue = grid[y][x + 1];
  }
  if (y > 0 && grid[y - 1][x] >= highestValue) {
    bestDirection = "down";
    console.log(grid[y - 1][x]);
    highestValue = grid[y - 1][x];
  }
  if (y < 10 && grid[y + 1][x] >= highestValue) {
    bestDirection = "up";
    console.log(grid[y + 1][x]);
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
  const functions = [evaluateFoodTiles, evaluateCollisiontiles];
  console.log("MOVE");
  let grid = getDefaultGrid(gameState.board.width, gameState.board.height, 0);

  functions.forEach((func) => {
    const funcGrid = func(grid, gameState);
    grid = joinGrids(grid, funcGrid);
    console.log("FUNC", func);
    printGrid(funcGrid);
    printGrid(grid);
  });

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
