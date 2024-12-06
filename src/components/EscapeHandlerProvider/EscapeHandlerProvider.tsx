import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type EscapeHandlerContextType = {
  handler: (callback: () => void) => () => void;
};

const EscapeHandlerContext = createContext<EscapeHandlerContextType | null>(
  null,
);

export const useEscapeHandler = () => {
  const context = useContext(EscapeHandlerContext);
  if (!context) {
    throw new Error(
      'useEscapeHandler must be used within EscapeHandlerProvider',
    );
  }
  return context;
};

export const EscapeHandlerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [handlers, setHandlers] = useState<(() => void)[]>([]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && handlers.length > 0) {
        const last = handlers[handlers.length - 1];
        last();
      }
    },
    [handlers],
  );

  const handler = useCallback((cb: any) => {
    setHandlers((prev) => [...prev, cb]);

    return () => {
      setHandlers((prev) => prev.filter((handler) => handler !== cb));
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return (
    <EscapeHandlerContext.Provider value={{ handler }}>
      {children}
    </EscapeHandlerContext.Provider>
  );
};
