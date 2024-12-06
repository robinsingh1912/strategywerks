import { useOutsideClick } from '@/hooks'; // Custom hook to handle clicks outside the modal
import { ReactNode, useRef } from 'react'; // Import necessary React utilities
import ReactDOM from 'react-dom'; // Import ReactDOM for rendering the modal outside the root element

interface Props {
  isOpen: boolean; // Determines if the modal should be displayed
  onClose: () => void; // Callback function to close the modal
  children: ReactNode; // The content to be displayed inside the modal
}

export function Modal({ isOpen, onClose, children }: Props) {
  // Create a ref to attach to the modal content
  const modalRef = useRef<HTMLDivElement>(null);

  // Use the custom hook to detect clicks outside the modal content
  useOutsideClick(modalRef, onClose);

  // If the modal is not open, render nothing
  if (!isOpen) return null;

  // Use ReactDOM.createPortal to render the modal outside the main DOM hierarchy
  return ReactDOM.createPortal(
    <div id='modal'>
      {/* Overlay to darken the background and center the modal */}
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        {/* Modal content */}
        <div
          ref={modalRef} // Attach the ref to the modal content
          className='bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative'
        >
          {/* Close button */}
          <button
            onClick={onClose} // Call the onClose function when clicked
            className='absolute top-2 right-2 text-gray-600 hover:text-gray-800'
          >
            &times; {/* Close icon */}
          </button>
          {children} {/* Render the children inside the modal */}
        </div>
      </div>
    </div>,
    document.body // Render the modal in the body element
  );
}
