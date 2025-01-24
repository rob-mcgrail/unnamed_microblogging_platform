import { createContext, useContext, useState, ReactNode } from "react";
import { TextHandler } from "~/components/text-counters";

interface RichTextContextType {
  content: string;
  setContent: (value: string) => void;
  textHandlers: TextHandler[];
  setTextHandlers: (value: any[]) => void;
  inputAlert: boolean;
  setInputAlert: (value: boolean) => void;
  textHandlerAlerts: string[];
  setTextHandlerAlerts: (value: any[]) => void;
}

const RichTextContext = createContext<RichTextContextType | undefined>(undefined);

export const RichTextProvider: React.FC<{ children: ReactNode; storedTextHandlers: TextHandler[] }> = ({ children, storedTextHandlers }) => {

  const [content, setContent] = useState<string>("");
  const [inputAlert, setInputAlert] = useState<boolean>(false);
  const [textHandlerAlerts, setTextHandlerAlerts] = useState<string[]>([]);
  const [textHandlers, setTextHandlers] = useState<TextHandler[]>(storedTextHandlers);

  return (
    <RichTextContext.Provider value={
      { 
        content, 
        setContent,
        textHandlers, 
        setTextHandlers,
        inputAlert,
        setInputAlert,
        textHandlerAlerts,
        setTextHandlerAlerts
      }
    }>
      {children}
    </RichTextContext.Provider>
  );
};

export const useRichText = () => {
  const context = useContext(RichTextContext);
  if (!context) throw new Error("useRichText must be used within a RichTextContext Provider");
  return {
    ...context
  };
};
