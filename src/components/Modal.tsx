import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    console.log('Clicked outside modal'); // Debugging
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      console.log('Closing modal'); // Debugging
      onClose();
    }
  };

  useEffect(() => {
    console.log('useEffect triggered, isOpen:', isOpen); // Debugging
    if (isOpen) {
      console.log('Adding event listener'); // Debugging
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      console.log('Removing event listener'); // Debugging
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};;

export default Modal;
