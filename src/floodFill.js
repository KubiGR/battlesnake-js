export function floodFill(grid, row, col, newValue) {
  const current = grid[row][col];

  if (current === newValue) {
    return grid;
  }

  fill(grid, row, col, newValue, current);

  return grid;
}

function fill(grid, row, col, newValue, current) {
  if (
    row < 0 ||
    col < 0 ||
    row > grid.length - 1 ||
    col > grid[row].length - 1 ||
    grid[row][col] !== current
  ) {
    return;
  }

  grid[row][col] = newValue;

  fill(grid, row - 1, col, newValue, current);
  fill(grid, row + 1, col, newValue, current);
  fill(grid, row, col - 1, newValue, current);
  fill(grid, row, col + 1, newValue, current);
}
