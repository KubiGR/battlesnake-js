export function floodFill(grid, row, col, newValue) {
  const current = grid[row][col];

  if (current === newValue) {
    return grid;
  }

  const numberOfTiles = {
    number: 0,
  };
  fill(grid, row, col, newValue, current, numberOfTiles);

  return { grid, numberOfTiles: numberOfTiles.number };
}

function fill(grid, row, col, newValue, current, numberOfTiles) {
  if (
    row < 0 ||
    col < 0 ||
    row > grid.length - 1 ||
    col > grid[row].length - 1 ||
    grid[row][col] !== current
  ) {
    return;
  }

  numberOfTiles.number += 1;
  grid[row][col] = newValue;

  fill(grid, row - 1, col, newValue, current, numberOfTiles);
  fill(grid, row + 1, col, newValue, current, numberOfTiles);
  fill(grid, row, col - 1, newValue, current, numberOfTiles);
  fill(grid, row, col + 1, newValue, current, numberOfTiles);
}
