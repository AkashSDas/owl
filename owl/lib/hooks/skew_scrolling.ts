import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const getSize = () => ({
    width: typeof window !== "undefined" && window.innerWidth,
    height: typeof window !== "undefined" && window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState(() => getSize());

  const handleResize = () => {
    setWindowSize(() => getSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
