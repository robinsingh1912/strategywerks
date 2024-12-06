import { useEffect } from 'react';

// Custom hook to detect clicks outside a specified element and trigger a callback
export function useOutsideClick(
  ref: React.RefObject<HTMLElement>, // Reference to the element to monitor
  onClose: () => void // Callback function to execute when an outside click is detected
) {
  useEffect(() => {
    // Function to handle click events
    function handleClickOutside(event: MouseEvent) {
      // Check if the click was outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose(); // Execute the callback function
      }
    }

    // Add event listener to the document to detect clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove the event listener when the component unmounts or dependencies change
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]); // Dependencies array to re-run the effect if the ref or onClose changes
}
