import { useOutsideClick } from '@/hooks';
import { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
export function Modal({ isOpen, onClose, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div id='modal'>
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div
          ref={modalRef}
          className='bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative'
        >
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-gray-600 hover:text-gray-800'
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
