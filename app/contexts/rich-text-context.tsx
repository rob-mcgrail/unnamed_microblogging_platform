import { createContext, useContext, useState, ReactNode } from "react";

import { defaultTextHandlers } from "~/data/text-handlers";

interface RichTextContextType {
  content: string;
  setContent: (value: string) => void;
  processContent: (text: string) => void;
  textHandlers: any[];
  setTextHandlers: (value: any[]) => void;
  inputAlert: boolean;
  setInputAlert: (value: boolean) => void;
  textHandlerAlerts: string[];
  setTextHandlerAlerts: (value: string[]) => void;
}

const RichTextContext = createContext<RichTextContextType | undefined>(undefined);


function removeCharactersFromBack(
  fromString: string,
  charactersToRemove: string
): string {
  const charCounts: Record<string, number> = {};
  for (const char of charactersToRemove) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  const result: string[] = [];
  for (let i = fromString.length - 1; i >= 0; i--) {
    const char = fromString[i];
    if (charCounts[char] > 0) {
      charCounts[char]--; 
    } else {
      result.push(char); 
    }
  }

  return result.reverse().join('');
}


export const RichTextProvider = ({ children }: { children: ReactNode }) => {

  const [content, setContent] = useState<string>("");
  const [textHandlers, setTextHandlers] = useState<any[]>(defaultTextHandlers);
  const [inputAlert, setInputAlert] = useState<boolean>(false);
  const [textHandlerAlerts, setTextHandlerAlerts] = useState<string[]>([]);

  const processContent = (text: string) => {
    textHandlers.sort((a, b) => a.priority - b.priority);
    let processedText = text;
    setInputAlert(false);

    textHandlers.forEach((handler) => {

      const result = handler.process(processedText, handler.persistentCount);
      processedText = result.modifiedText;
      handler.activeCount = handler.persistentCount - result.matchCount;

        
      if (handler.activeCount < 1) {
        handler.activeCount = 0;
        let significantEnding = text.slice(-handler.mimMatchLength);
        let alertTestResult = handler.process(significantEnding, 10);
        if (alertTestResult.matchCount > 0) {
          setTextHandlerAlerts((prev) => [...prev, handler.id]);
          setTimeout(() => setTextHandlerAlerts((prev) => prev.filter((id) => id !== handler.id)), 300);
        }
        handler.alerted = true;
      }
      else {
        handler.alerted = false;
      }
    });
    
    if (processedText.length > 0) {
      text = removeCharactersFromBack(text, processedText);

      setInputAlert(true);
      setTimeout(() => setInputAlert(false), 300);
    }

    setTextHandlers(textHandlers);
    setContent(text);
  }
  

  return (
    <RichTextContext.Provider value={
      { 
        content, 
        setContent,
        processContent,
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
  return context;
};