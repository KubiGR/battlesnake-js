export function info() {
  console.log("INFO");
  const response = {
    apiversion: "1",
    author: "andreas",
    color: "#8c831e",
    head: "dead",
    tail: "hook",
  };
  return response;
}

export function start(gameState) {
  console.log(`${gameState.game.id} START`);
}

export function end(gameState) {
  console.log(`${gameState.game.id} END\n`);
}
