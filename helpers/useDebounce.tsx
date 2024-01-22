//
// Description: Debounce a callback function in React ..
// https://www.developerway.com/posts/debouncing-in-react
//

import { useEffect, useMemo, useRef } from "react";

export function useDebounce(callback: any, timeout: number = 300) {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      // @ts-ignore
      ref.current?.();
    };

    return debounce(func, timeout);
  }, []);

  return debouncedCallback;
};

export function debounce(func: any, timeout: number = 300) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);

    // @ts-ignore
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}