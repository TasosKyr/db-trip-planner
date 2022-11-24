import { useEffect, useState } from "react";
// React hook from usehooks-ts lib (https://usehooks-ts.com/react-hook/use-debounce)
export default function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedQuery, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedQuery;
}
