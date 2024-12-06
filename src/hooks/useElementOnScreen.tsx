import { useState, useEffect, useRef } from 'react';

// Custom hook to detect when an element is visible on the screen
export const useElementOnScreen = <T extends Element>(
  options: IntersectionObserverInit // Options for configuring the Intersection Observer
): [React.RefObject<T>, boolean] => {
  // Create a ref to attach to the target element
  const elementRef = useRef<T>(null);

  // State to track the visibility of the element
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(([entry]) => {
      // Update the visibility state based on the intersection status
      setIsVisible(entry.isIntersecting);
    }, options);

    // Get the current element from the ref
    const currentElement = elementRef.current;
    if (currentElement) {
      // Start observing the element
      observer.observe(currentElement);
    }

    // Cleanup function to unobserve the element when the component unmounts or dependencies change
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options]); // Dependencies array to re-run the effect if the ref or options change

  // Return the ref and the visibility state
  return [elementRef, isVisible];
};
