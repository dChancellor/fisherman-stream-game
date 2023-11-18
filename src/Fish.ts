import { alignFishingLine, gameState } from "./main";
import { getRandomInRange } from "./utils";

type FishSize = "big" | "medium" | "small";

export class Fish {
  id: string;
  size: FishSize;
  position: { x: number; y: number };
  isSwimming: boolean;
  fishElement: HTMLElement;

  constructor(id?: string, size?: FishSize) {
    this.id = id || crypto.randomUUID(); // Can supply an id if you want to tie it to chat user id or something, otherwise - random
    const sizeRandomizer = Math.random() * 100;
    const fishSize =
      sizeRandomizer > 80 ? "big" : sizeRandomizer > 50 ? "medium" : "small";
    this.size = size || fishSize; // Can supply size if you want to tie it to sub tier - otherwise, random
    this.position = { x: Math.random() * 100, y: 0 };
    this.isSwimming = true;
    const fishElement = document.createElement("div");
    this.fishElement = fishElement;
    this.fishElement.innerHTML = "🐟";
    fishElement.className = "fish " + fishSize;
    this.fishElement.style.filter = `hue-rotate(${Math.random() * 300}deg)`;
    this.swim();
  }

  swim() {
    setTimeout(() => {
      if (!this.isSwimming) return;
      if (
        this.position.x < 20 &&
        this.position.x > 18 &&
        !gameState.fishCaughtOnLine
      ) {
        this.bit();
        return;
      }
      this.goToNewPosition();
      this.swim();
    }, 3000);
  }

  goToNewPosition(newX?: number) {
    newX = newX ? newX : getRandomInRange(this.position.x, 20);
    const isGettingAway = this.position.x < newX ? true : false;
    if (isGettingAway) {
      this.fishElement.style.scale = "-1 1";
    } else {
      this.fishElement.style.scale = "1 1";
    }
    this.position.x = newX;
    this.fishElement.style.left = `${newX}%`;
    return newX;
  }

  bit() {
    this.isSwimming = false;
    gameState.fishCaughtOnLine = this;
    this.fishElement.style.background = "red";
    // This is the initial pulling away attempt to get some space
    const newPosition = Math.random() * 20 + 30;
    this.fishElement.style.scale = "-1 1";
    this.goToNewPosition(newPosition);
    alignFishingLine((newPosition / 100) * window.innerWidth + 10);
    // This starts the catching cycle
    this.tryAndGetAway();
  }

  caught() {}
  tryAndGetAway() {
    setTimeout(() => {
      const newPosition = getRandomInRange(this.position.x, 5);
      alignFishingLine((newPosition / 100) * window.innerWidth);
      this.goToNewPosition(newPosition);
      if (this.position.x < 20) {
        this.fishElement.style.rotate = "45deg";
        this.caught();
      } else {
        this.tryAndGetAway();
      }
    }, 3000);
  }
  stop() {
    this.isSwimming = false;
  }
}
