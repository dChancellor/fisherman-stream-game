import { Fish } from "./Fish";

const waterElement = document.getElementById("water");
const pauseButton = document.querySelector("button[name='pause']");
const startButton = document.querySelector("button[name='start']");
export const fishingLine = document.getElementById("line");
const activeFish = new Map();

function makeFish() {
  console.log("fish made!");
  if (activeFish.size > gameState.mostActiveFish) return;
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
  fishCaughtOnLine: Fish | null;
  mostActiveFish: number;
};
export const gameState: GameState = {
  gameClock: undefined,
  isGamePaused: false,
  gameInterval: 1000,
  fishCaughtOnLine: null,
  mostActiveFish: 10,
};
function startGame() {
  gameState.isGamePaused = false;
  console.log("starting game...");
  gameState.gameClock = setInterval(makeFish, gameState.gameInterval);
}

function pauseGame() {
  gameState.isGamePaused = true;
  console.log("pausing game...");
  console.log("here are the active fish", activeFish);
  clearInterval(gameState.gameClock);
  activeFish.forEach((fish) => fish.stop());
}
export function alignFishingLine(caughtFishX: number) {
  const fishPositionInPx =
    caughtFishX - fishingLine!.getBoundingClientRect().left;
  const poleHeight =
    window.innerHeight - fishingLine!.getBoundingClientRect().top - 40; // -40 for half height of water
  const rads = Math.atan(fishPositionInPx / poleHeight);
  const hypotenuseLength = Math.sqrt(
    Math.pow(fishPositionInPx, 2) + Math.pow(poleHeight, 2)
  );
  fishingLine!.style.height = `${hypotenuseLength}px`;
  fishingLine!.style.transform = `rotate(-${rads}rad)`;
  fishingLine!.style.backgroundColor = "green";
}

pauseButton?.addEventListener("click", pauseGame);
startButton?.addEventListener("click", startGame);
//alignButton?.addEventListener("click", alignFishingLine);
startGame();
