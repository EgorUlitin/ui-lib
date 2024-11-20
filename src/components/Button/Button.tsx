import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, ...props }: IButton) => {
  return (
    <button className="button" type="button" {...props}>
      {children}
    </button>
  );
};
