import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(
        `Error parsing localStorage value for key "${key}":`,
        error
      );
      return defaultValue;
    }
  });

  const setItem = (newValue: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(event.newValue ? JSON.parse(event.newValue) : defaultValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, defaultValue]);

  return [value, setItem];
}

export default useLocalStorage;
