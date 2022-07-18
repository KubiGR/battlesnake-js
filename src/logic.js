import {
  changeAllTilesOfValue,
  cloneGrid,
  getManhattanDist,
  getMaxManhattanDist,
  getSortedMoves,
  printGrid,
  printStats,
  valueDownOfHead,
  valueLeftOfHead,
  valueRightOfHead,
  valueUpOfHead,
} from "./utils.js";
import { floodFill } from "./floodFill.js";

function getDefaultGrid(width, height, value) {
  const grid = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
}

// function joinGrids(grid1, grid2) {
//   const grid = [];
//   for (let i = 0; i < grid1.length; i++) {
//     const row = [];
//     for (let j = 0; j < grid1[i].length; j++) {
//       if (grid1[i][j] < 0 && grid2[i][j] < 0) {
//         row.push(Math.min(grid1[i][j], grid2[i][j]));
//       } else {
//         row.push(grid1[i][j] * grid2[i][j]);
//       }
//     }
//     grid.push(row);
//   }
//   return grid;
// }

// function getDirection(grid, x, y) {
//   let bestDirection = "";
//   let highestValue = -1;
//   if (x > 0 && grid[y][x - 1] >= highestValue) {
//     bestDirection = "left";
//     highestValue = grid[y][x - 1];
//   }
//   if (x < 10 && grid[y][x + 1] >= highestValue) {
//     bestDirection = "right";
//     highestValue = grid[y][x + 1];
//   }
//   if (y > 0 && grid[y - 1][x] >= highestValue) {
//     bestDirection = "down";
//     highestValue = grid[y - 1][x];
//   }
//   if (y < 10 && grid[y + 1][x] >= highestValue) {
//     bestDirection = "up";
//     highestValue = grid[y + 1][x];
//   }
//   return bestDirection;
// }

function evaluateFoodTiles(grid, gameState) {
  const myHead = gameState.you.head;
  const newGrid = cloneGrid(grid);
  const maxDist = getMaxManhattanDist(grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const mods = [];
      let foundFoodCloseBy = false;
      gameState.board.food.forEach((foodItem) => {
        if (foodItem.x === j && foodItem.y === i) {
          foundFoodCloseBy = true;
          newGrid[i][j] = 1000;
        } else {
          const dist = getManhattanDist(j, i, foodItem.x, foodItem.y);
          const moddedDist = 1 - dist / maxDist;

          const distFoodFromHead = getManhattanDist(
            myHead.x,
            myHead.y,
            foodItem.x,
            foodItem.y
          );
          const moddedDistFromHead = 1 - distFoodFromHead / maxDist;

          const loggedDistFromHead = -(
            1 /
            Math.log(moddedDistFromHead) /
            Math.log(1.05)
          );
          const finalMod = moddedDist * loggedDistFromHead;

          mods.push(finalMod);
        }
      });
      if (!foundFoodCloseBy) {
        const average =
          mods.reduce((prev, curr) => prev + curr, 0) / mods.length;
        newGrid[i][j] = average;
      }
    }
  }
  return newGrid;
}

function evaluateCollisiontiles(grid, gameState) {
  const { snakes } = gameState.board;
  for (let i = 0; i < snakes.length; i++) {
    const snake = snakes[i];
    for (let j = 0; j < snake.body.length; j++) {
      const bodyPart = snake.body[j];
      grid[bodyPart.y][bodyPart.x] = -1;
    }
  }
}

function getAwayFromBiggerSnakes(grid, gameState) {
  const { snakes } = gameState.board;
  const mySnake = snakes.find((sn) => sn.id === mySnakeId);
  const otherSnakes = snakes.filter((sn) => sn.id !== mySnakeId);
  otherSnakes.forEach((sn) => {
    if (sn.length > mySnake.length) {
      grid[sn.head.y + 1][sn.head.x] = -0.8;
      grid[sn.head.y - 1][sn.head.x] = -0.8;
      grid[sn.head.y][sn.head.x + 1] = -0.8;
      grid[sn.head.y][sn.head.x - 1] = -0.8;
    }
  });
}

export function move(gameState) {
  // if (responseNr > 50) {
  //   console.log("DEATH");
  //   return { move: "up" };
  // }

  printStats(gameState);
  const myLength = gameState.you.length;
  const myHead = gameState.you.head;
  if (!mySnakeId) {
    mySnakeId = gameState.you.id;
  }
  // const functions = [evaluateFoodTiles];
  console.log("MOVE ", responseNr);
  let grid = getDefaultGrid(gameState.board.width, gameState.board.height, 0);

  // TODO: Check logic and mutable grids
  // functions.forEach((func) => {
  //   const funcGrid = func(grid, gameState);
  //   console.log("FUNC", func);
  //   printGrid(funcGrid);
  //   grid = joinGrids(grid, funcGrid);
  // });

  grid = evaluateFoodTiles(grid, gameState);
  // console.log(getSortedMoves(grid, myHead));
  // printGrid(grid);
  getAwayFromBiggerSnakes(grid, gameState);
  evaluateCollisiontiles(grid, gameState);
  // printGrid(grid);
  // console.log(getSortedMoves(grid, myHead));

  let floods = 0;
  let Rnr, Lnr, Unr, Dnr;

  let gridToFloodFill = cloneGrid(grid).map((row) => {
    return row.map((c) => {
      if (c >= 0) return "N";
      return c;
    });
  });

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
    floods++;
  }

  if (floods > 1) {
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

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (typeof gridToFloodFill[i][j] === "number") {
          grid[i][j] = gridToFloodFill[i][j];
        }
      }
    }
  }

  const direction = Object.keys(getSortedMoves(grid, myHead))[0];

  responseNr++;

  const response = {
    move: direction,
  };
  return response;
}

let responseNr = 0;
let mySnakeId;
