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
          const str = c < 0 ? c.toFixed(1) : c.toFixed(2);
          process.stdout.write(`${str}|`);
        });
        process.stdout.write(
          "\n   ------------------------------------------------------\n"
        );
      }
    });
}

export function printStats(gameState) {
  console.log(`[HEAD]: ${gameState.you.head.x}.${gameState.you.head.y}`);
  console.log(`[LENGTH]: ${gameState.you.length}`);
}
