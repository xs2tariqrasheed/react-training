import { useState, useRef, useCallback } from "react";

function useLoading(asyncFunction) {
  const [loading, setLoading] = useState(false);

  const asyncFunctionRef = useRef(async (...args) => {
    try {
      setLoading(true);
      return await asyncFunction(...args);
    } finally {
      setLoading(false);
    }
  });

  // Using useCallback to ensure the returned function has a stable identity
  const wrappedFunction = useCallback((...args) => {
    return asyncFunctionRef.current(...args);
  }, []);

  return [wrappedFunction, loading];
}

export default useLoading;
