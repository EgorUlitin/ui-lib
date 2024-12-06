import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} className="button" type="button" {...props}>
        {children}
      </button>
    );
  },
);
