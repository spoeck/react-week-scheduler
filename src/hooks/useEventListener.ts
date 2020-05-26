import { useEffect } from 'react';

export function useEventListener<
  K extends keyof HTMLElementEventMap,
  Element extends HTMLElement
>(
  ref: React.RefObject<Element>,
  event: K,
  listener: (this: Element, event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions,
  { enabled = true } = {},
) {
  const { current } = ref;

  useEffect(() => {
    if (current === null) {
      return;
    }

    if (enabled) {
      current.addEventListener(event, listener as any, options);
    } else if (listener) {
      current.removeEventListener(event, listener as any);
    }

    return () => {
      if (!current) {
        return;
      }

      current.removeEventListener(event, listener as any);
    };
  }, [current, event, listener, options, enabled]);
}
