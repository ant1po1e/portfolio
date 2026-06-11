import { useState, useCallback } from "react";

/**
 * useWindowManager — tracks z-index order for multiple windows.
 * Call bringToFront(id) when a window is clicked/focused.
 */
export default function useWindowManager(ids) {
  const [order, setOrder] = useState([...ids]);

  const bringToFront = useCallback((id) => {
    setOrder((prev) => {
      if (prev[prev.length - 1] === id) return prev; 
      return [...prev.filter((x) => x !== id), id];
    });
  }, []);

  const zIndex = useCallback(
    (id) => 10 + order.indexOf(id),
    [order]
  );

  return { bringToFront, zIndex };
}
