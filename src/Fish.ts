import { getRandomInRange } from "./utils";

type FishSize = "big" | "medium" | "small";

export class Fish {
  id: string;
  color: string;
  size: FishSize;
  position: { x: number; y: number };
  isSwimming: boolean;
  fishElement: HTMLElement;

  constructor(id?: string, size?: FishSize) {
    this.id = id || crypto.randomUUID();
    this.color = "purple";
    const randomSize = Math.random() * 100;
    const fishSize =
      randomSize > 80 ? "big" : randomSize > 50 ? "medium" : "small";
    this.size = size || fishSize;
    this.position = { x: Math.random() * 100, y: 0 };
    this.isSwimming = false;
    const fishElement = document.createElement("div");
    this.fishElement = fishElement;
    fishElement.className = "fish " + fishSize;
    this.swim();
  }

  swim() {
    setTimeout(() => {
      const newPosition = getRandomInRange(this.position.x, 20);
      this.swim();
      this.position.x = newPosition;
      this.fishElement.style.left = `${newPosition}%`;
      this.isSwimming = true;
    }, 3000);
  }

  stop() {
    this.isSwimming = false;
  }

  displayInfo() {
    console.log(
      `Fish Name: ${this.id}, Color: ${this.color}, Size: ${this.size}`
    );
    console.log(`Current Position: (${this.position.x}, ${this.position.y})`);
  }
}
