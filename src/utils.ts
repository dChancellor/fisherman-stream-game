export function getRandomInRange(base: number, range: number) {
  let minPossible = Math.max(base - range, 0);
  let maxPossible = Math.min(base + range, 100);

  return minPossible + Math.random() * (maxPossible - minPossible);
}

export function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI);
}
