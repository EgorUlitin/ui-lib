import { TDrawerPosition } from '../Drawer/Drawer';
import { TTooltipPosition } from '../Tooltip/Tooltip';

const options = [
  { id: 'top', label: 'top' },
  { id: 'left', label: 'left' },
  { id: 'right', label: 'right' },
  { id: 'bottom', label: 'bottom' },
];

export const RadioButton = ({
  selected,
  setSelected,
}: {
  setSelected: (opt: TDrawerPosition | TTooltipPosition) => void;
  selected: TDrawerPosition | TTooltipPosition;
}) => {
  return (
    <div className="flex space-x-6">
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center space-x-3 cursor-pointer ${
            selected === option.id ? 'text-blue-600' : 'text-gray-600'
          }`}
        >
          <input
            type="radio"
            name="radio"
            value={option.id}
            checked={selected === option.id}
            onChange={() => setSelected(option.id as TDrawerPosition)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
