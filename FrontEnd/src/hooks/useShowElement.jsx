import { useCallback, useEffect, useState } from 'react';

function useShowElement(initVisibal = false) {
  const [isVisible, setIsVisible] = useState(initVisibal);

  const toggleVisibility = useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [],
  );
  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);

  return [isVisible, toggleVisibility, setIsVisible];
}
export default useShowElement;
