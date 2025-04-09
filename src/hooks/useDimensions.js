import { useState, useEffect, useLayoutEffect } from "react";

export const useDimensions = (targetRef) => {
  const getDimensions = () => ({
    width: targetRef.current?.offsetWidth || 0,
    height: targetRef.current?.offsetHeight || 0,
  });

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => setDimensions(getDimensions());

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
};
