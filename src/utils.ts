export function getRandomInRange(base: number, range: number) {
  let minPossible = Math.max(base - range, 0);
  let maxPossible = Math.min(base + range, window.innerWidth);

  return minPossible + Math.random() * (maxPossible - minPossible);
}
