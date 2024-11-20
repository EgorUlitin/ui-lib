import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  children: ReactNode;
  element?: HTMLElement;
}

export const Portal = ({ children, element = document.body }: IPortal) =>
  createPortal(children, element);
