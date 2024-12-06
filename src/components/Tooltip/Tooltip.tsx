import { Transition } from '@headlessui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

export type TTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

const mapPosition = {
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
};

export const Tooltip = ({
  children,
  title,
  position = 'top',
}: {
  children: ReactNode;
  title: string;
  position?: TTooltipPosition;
}) => {
  const [shown, setShown] = useState(false);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseOver = () => {
      setShown(true);
    };

    const handleMouseLeave = () => {
      setShown(false);
    };

    const ref = childRef.current;

    ref?.addEventListener('mouseover', handleMouseOver);
    ref?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref?.removeEventListener('mouseover', handleMouseOver);
      ref?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={childRef}>
      {children}
      <Transition
        show={shown}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`absolute ${mapPosition[position]} mb-2 w-max bg-gray-800 text-white text-sm p-2 rounded pointer-events-none`}
        >
          {title}
        </div>
      </Transition>
    </div>
  );
};
