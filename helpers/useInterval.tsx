'use client'

import { useEffect, useRef } from "react";

export default function useInterval(callback: any, delay: number | null) {
  const intervalRef = useRef<any>();
  const savedCallback = useRef<any>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);

  return intervalRef;
}