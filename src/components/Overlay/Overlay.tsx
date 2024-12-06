import { Transition } from '@headlessui/react';
import './Overlay.css';

export const Overlay = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => (
  <Transition
    show={isOpen}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50" />
  </Transition>
);
