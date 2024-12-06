import { useRef, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Popover } from '../../components/Popover/Popover';

export const PopoverContainer = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button onClick={handleClick} ref={triggerRef}>
        use popover
      </Button>
      <Popover open={open} close={handleClose} triggerRef={triggerRef}>
        <p className="text-white text-sm mb-4">
          Are you sure you want to proceed?
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Confirm
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Cancel
          </button>
        </div>
      </Popover>
    </div>
  );
};
