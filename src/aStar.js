import { getManhattanDist } from "./utils.js";
import { PriorityQueue } from "./priorityQueue.js";

export function aStar(grid, originX, originY, targetX, targetY) {
  const gridOfSquares = [];
  for (let i = 0; i < grid.length; i++) {
    gridOfSquares.push([]);
    for (let j = 0; j < grid[i].length; j++) {
      gridOfSquares[i].push(new Square(j, i, grid[i][j]));
    }
  }
  const openSet = new PriorityQueue();
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  const start = gridOfSquares[originY][originX];
  const goal = gridOfSquares[targetY][targetX];
  gScore.set(start, 0);
  fScore.set(start, getManhattanDistWithSquares(start, goal));
  openSet.enqueue([start, fScore.get(start)]);

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()[0];
    if (current.equals(goal)) {
      return reconstructPath(cameFrom, current);
    }

    getNeighbors(current, gridOfSquares).forEach((n) => {
      const tentative_gScore = gScore.get(current) + 1;

      if (
        tentative_gScore <
        (gScore.has(n) ? gScore.get(n) : Number.POSITIVE_INFINITY)
      ) {
        cameFrom.set(n, current);
        gScore.set(n, tentative_gScore);
        fScore.set(n, tentative_gScore + getManhattanDistWithSquares(n, goal));
        if (!openSet.includes(n)) {
          openSet.enqueue([n, fScore.get(n)]);
        }
      }
    });
  }

  return [];
}

function getManhattanDistWithSquares(square, finalSquare) {
  return getManhattanDist(square.x, square.y, finalSquare.x, finalSquare.y);
}

class Square {
  x;
  y;
  v;

  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
  }

  equals(square) {
    return square.x === this.x && square.y === this.y;
  }
}

function getNeighbors(square, gridOfSquares) {
  const neighborsArray = [];
  if (square.x > 0 && gridOfSquares[square.y][square.x - 1].v >= 0)
    neighborsArray.push(gridOfSquares[square.y][square.x - 1]);
  if (square.y > 0 && gridOfSquares[square.y - 1][square.x].v >= 0)
    neighborsArray.push(gridOfSquares[square.y - 1][square.x]);
  if (
    square.x < gridOfSquares.length - 1 &&
    gridOfSquares[square.y][square.x + 1].v >= 0
  )
    neighborsArray.push(gridOfSquares[square.y][square.x + 1]);
  if (
    square.y < gridOfSquares.length - 1 &&
    gridOfSquares[square.y + 1][square.x].v >= 0
  )
    neighborsArray.push(gridOfSquares[square.y + 1][square.x]);
  return neighborsArray;
}

function reconstructPath(cameFrom, current) {
  const totalPath = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    totalPath.unshift(current);
  }
  return totalPath;
}
