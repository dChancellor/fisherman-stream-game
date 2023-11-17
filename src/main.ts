import { Fish } from "./Fish";

const waterElement = document.getElementById("water");
const pauseButton = document.querySelector("button[name='pause']");
const startButton = document.querySelector("button[name='start']");

const activeFish = new Map();

function makeFish() {
  console.log("fish made!");
  let fish = new Fish();
  const fishElement = fish.fishElement;
  fishElement.style.left = `${fish.position.x}%`;
  waterElement?.appendChild(fishElement);
  activeFish.set(fish.id, fish);
}
type GameState = {
  gameClock: number | undefined;
  isGamePaused: boolean;
  gameInterval: number;
};
const gameState: GameState = {
  gameClock: undefined,
  isGamePaused: false,
  gameInterval: 5000,
};
function startGame() {
  gameState.isGamePaused = false;
  console.log("starting game...");
  //gameState.gameClock = setInterval(makeFish, gameState.gameInterval);
}

function pauseGame() {
  gameState.isGamePaused = true;
  console.log("pausing game...");
  console.log("here are the active fish", activeFish);
  clearInterval(gameState.gameClock);
}

pauseButton?.addEventListener("click", pauseGame);
startButton?.addEventListener("click", startGame);
startGame();
