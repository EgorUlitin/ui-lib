import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TTooltipPosition } from '../Tooltip/Tooltip';
import { Transition } from '@headlessui/react';
import { useEscapeHandler } from '../EscapeHandlerProvider/EscapeHandlerProvider';

// const mapPosition = {
//   left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
//   right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
//   top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
//   bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
// };

export const Popover = ({
  children,
  // position = 'right',
  open,
  close,
  triggerRef,
}: {
  children: ReactNode;
  position?: TTooltipPosition;
  open: boolean;
  close: () => void;
  triggerRef: RefObject<HTMLElement>;
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const [positionClasses, setPositionClasses] = useState<string>('');
  const { handler } = useEscapeHandler();

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (childRef.current && !childRef.current.contains(e.target as Node)) {
        e.stopPropagation();
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    if (open && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      setPositionClasses(
        `top-[${triggerRect.bottom}px] left-[${triggerRect.left}px]`,
      );
    }
  }, [open, triggerRef, childRef]);

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside, open]);

  useEffect(() => {
    if (open) {
      const unregister = handler(close);
      return () => {
        unregister();
      };
    }
  }, [handler, open, close]);

  return (
    <Transition
      show={open}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={childRef}
        className={`absolute mt-2 w-max bg-gray-800 text-white text-sm p-2 rounded ${positionClasses} transform -translate-x-[5%]`}
      >
        {children}
      </div>
    </Transition>
  );
};
