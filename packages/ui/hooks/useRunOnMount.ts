import { useEffect, useState } from "react";
export const useRunOnMount = (fn) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (!hasMounted) {
      fn();
      setHasMounted(true);
    }
  }, [hasMounted, fn]);
};
