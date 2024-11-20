import React, { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Drawer, TDrawerPosition } from './components/Drawer/Drawer';
import { RadioButton } from './components/RadioButton/RadioButton';

function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TDrawerPosition>('right');

  return (
    <div className="App">
      <div className="blockButton">
        <div className="flex flex-col gap-5">
          <Button onClick={() => setOpen(!open)}>use drawer</Button>
          <RadioButton selected={selected} setSelected={setSelected} />
        </div>

        <Button disabled>use popover</Button>
        <Button disabled>use select</Button>

        <Drawer
          onClose={() => setOpen(false)}
          isOpen={open}
          position={selected}
        >
          <div className="w-[300px] h-[300px]">Drawer content</div>
        </Drawer>
      </div>
    </div>
  );
}

export default App;
