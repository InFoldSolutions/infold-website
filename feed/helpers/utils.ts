import { useEffect, useRef } from 'react';

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

export function usePrevious(value: any): any {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}