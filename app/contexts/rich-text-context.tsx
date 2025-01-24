import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TextHandler } from "~/types";
import { processContent } from "~/utils/process-content";

interface RichTextContextType {
  content: string;
  setContent: (value: string) => void;
  textHandlers: TextHandler[];
  setTextHandlers: (value: any[]) => void;
  inputAlert: boolean;
  setInputAlert: (value: boolean) => void;
  textHandlerAlerts: string[];
  setTextHandlerAlerts: (value: any[]) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const RichTextContext = createContext<RichTextContextType | undefined>(undefined);

export const RichTextProvider: React.FC<{ children: ReactNode; storedTextHandlers: TextHandler[] }> = ({ children, storedTextHandlers }) => {

  const [content, setContent] = useState<string>("");
  const [inputAlert, setInputAlert] = useState<boolean>(false);
  const [textHandlerAlerts, setTextHandlerAlerts] = useState<string[]>([]);
  const [textHandlers, setTextHandlers] = useState<TextHandler[]>(storedTextHandlers);
  
  useEffect(() => {
    setTextHandlers(storedTextHandlers);
  }, [storedTextHandlers]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const processed = processContent(e.target.value, textHandlers, setTextHandlerAlerts, setInputAlert);
    setTextHandlers(processed.textHandlers);
    setContent(processed.text);
  };

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
        setTextHandlerAlerts,
        handleChange
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
