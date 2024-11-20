import { ReactNode } from 'react';
import { Portal } from '../Portal/Portal';
import { Transition } from '@headlessui/react';
import { Ovelay } from '../Overlay/Overlay';

export type TDrawerPosition = 'top' | 'bottom' | 'left' | 'right';

interface IDrawer {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position: TDrawerPosition;
}

const mapPosition = {
  left: {
    enterTo: 'translate-x-0',
    enterFrom: '-translate-x-full',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full',
    root: 'inset-y-0 left-0',
  },
  top: {
    enterTo: 'translate-y-0',
    enterFrom: '-translate-y-full',
    leaveFrom: 'translate-y-0',
    leaveTo: '-translate-y-full',
    root: 'inset-x-0 top-0',
  },
  right: {
    enterTo: 'translate-x-0',
    enterFrom: 'translate-x-full',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
    root: 'inset-y-0 right-0',
  },
  bottom: {
    enterTo: 'translate-y-0',
    enterFrom: 'translate-y-full',
    leaveFrom: 'translate-y-0',
    leaveTo: 'translate-y-full',
    root: 'inset-x-0 bottom-0',
  },
};

export const Drawer = ({
  children,
  isOpen,
  onClose,
  position = 'right',
}: IDrawer) => {
  const positionConfig = mapPosition[position];
  return (
    <Portal>
      <Ovelay onClose={onClose} isOpen={isOpen} />
      <Transition
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom={positionConfig.enterFrom}
        enterTo={positionConfig.enterTo}
        leave="transition-transform duration-300"
        leaveFrom={positionConfig.leaveFrom}
        leaveTo={positionConfig.leaveTo}
      >
        <div
          className={`z-50 fixed ${positionConfig.root} bg-white shadow-lg p-4`}
        >
          {children}
        </div>
      </Transition>
    </Portal>
  );
};
