"use client";
/* eslint-disable @typescript-eslint/no-explicit-any -- Disable to allow any for a generic hooks */
// Create a useLocaleStorage hook
import React from "react";

type EventListener = (this: Window, ev: StorageEvent) => any;

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const useLocalStorageSubscribe = (callback: EventListener) => {
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
  };
};

const getLocalStorageServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, "");
};

function dispatchStorageEvent(key: string, newValue: string) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => getLocalStorageItem(key);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Clashes with other eslint rule
  const store = React.useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot,
  )!;

  const setState = React.useCallback(
    (v: T | ((prevState: T) => T)) => {
      try {
        const currentState = JSON.parse(store) as T;
        const nextState =
          typeof v === "function"
            ? (v as (prevState: T) => T)(currentState)
            : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store],
  );

  React.useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== "undefined"
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState] as [
    T,
    typeof setState,
  ];
}
