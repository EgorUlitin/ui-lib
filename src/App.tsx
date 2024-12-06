import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Drawer, TDrawerPosition } from './components/Drawer/Drawer';
import { RadioButton } from './components/RadioButton/RadioButton';
import { Tooltip } from './components/Tooltip/Tooltip';
import { PopoverContainer } from './containers/Popover/PopoverContainers';
import { EscapeHandlerProvider } from './components/EscapeHandlerProvider/EscapeHandlerProvider';

function App() {
  const [open, setOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] =
    useState<TDrawerPosition>('right');

  return (
    <EscapeHandlerProvider>
      <div className="App">
        <div className="blockButton">
          <div className="flex flex-col gap-5">
            <Button onClick={() => setOpen(!open)}>use drawer</Button>
            <RadioButton
              selected={drawerPosition}
              setSelected={setDrawerPosition}
            />
          </div>

          <div className="flex flex-col gap-5">
            <Tooltip title="Tooltip title" position="right">
              <Button disabled>use tooltip</Button>
            </Tooltip>
          </div>

          <PopoverContainer />

          <Drawer
            onClose={() => setOpen(false)}
            isOpen={open}
            position={drawerPosition}
          >
            <div className="w-[300px] h-[300px]">
              <PopoverContainer />
            </div>
          </Drawer>
        </div>
      </div>
    </EscapeHandlerProvider>
  );
}

export default App;
