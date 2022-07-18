import express from "express";
import { move } from "./logic.js";
import { info, start, end } from "./misc.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.set("Server", "BattlesnakeOfficial/starter-snake-typescript");
  next();
});

const port = process.env.PORT || 8080;

export const internalGameState = {
  numberOfResponses: 0,
  mySnakeId: undefined,
};

app.get("/", (req, res) => {
  res.send(info());
});

app.post("/start", (req, res) => {
  internalGameState.mySnakeId = req.body.you.id;
  res.send(start(req.body));
});

app.post("/move", (req, res) => {
  internalGameState.numberOfResponses = internalGameState.numberOfResponses + 1;
  res.send(move(req.body));
});

app.post("/end", (req, res) => {
  res.send(end(req.body));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Starting Battlesnake Server at http://0.0.0.0:${port}...`);
});
