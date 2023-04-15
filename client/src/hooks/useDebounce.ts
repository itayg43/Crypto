import {useEffect, useState} from 'react';

const defaultDelayInMillis = 500;

const useDebounce = (
  value: string,
  delayInMillis: number = defaultDelayInMillis,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value.trim().toLowerCase());
    }, delayInMillis);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
