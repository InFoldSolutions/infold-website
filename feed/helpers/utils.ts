
export function findParentByCls(node: HTMLElement, cls: string, maxTries: number = 0): HTMLElement {
  let tries = 0;

  while (!node.classList || !node.classList.contains(cls)) {
    // @ts-ignore
    node = node.parentElement;

    if (!node || (maxTries > 0 && tries === maxTries)) {
      // @ts-ignore
      return null;
    }

    tries++;
  }

  return node;
}
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  return Math.floor(Math.random() * (max - min) + min);
}