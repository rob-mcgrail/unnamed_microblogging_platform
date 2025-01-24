import { createContext, useContext, useState, ReactNode } from "react";
import { TextHandler } from "~/components/text-counters";

interface RichTextContextType {
  content: string;
  setContent: (value: string) => void;
  processContent: (text: string) => void;
  textHandlers: TextHandler[];
  setTextHandlers: (value: any[]) => void;
  inputAlert: boolean;
  setInputAlert: (value: boolean) => void;
  textHandlerAlerts: string[];
  setTextHandlerAlerts: (value: any[]) => void;
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


export const RichTextProvider: React.FC<{ children: ReactNode; storedTextHandlers: TextHandler[] }> = ({ children, storedTextHandlers }) => {

  const [content, setContent] = useState<string>("");
  const [inputAlert, setInputAlert] = useState<boolean>(false);
  const [textHandlerAlerts, setTextHandlerAlerts] = useState<string[]>([]);
  const [textHandlers, setTextHandlers] = useState<TextHandler[]>(storedTextHandlers);

  const processContent = (text: string) => {
    const process = (
      text: string,
      persistentCount: number,
      regex: string
    ): { text: string; modifiedText: string; matchCount: number } => {
      let matchCount = 0;
      console.log(regex);
      // Replace matched characters and count them
      let modifiedText = text.replace(new RegExp(regex, 'gi'), (match) => {
        if (matchCount >= persistentCount) {
          return match;
        }
        matchCount++;
        return '';
      });
    
      return {
        text,
        modifiedText,
        matchCount,
      };
    }

    textHandlers.sort((a, b) => a.priority - b.priority);
    let processedText = text;

    textHandlers.forEach((handler) => {
      const result = process(processedText, handler.persistentCount, handler.regex);
      processedText = result.modifiedText;
      handler.activeCount = handler.persistentCount - result.matchCount;
        
      if (handler.activeCount < 1) {
        handler.activeCount = 0;
        let significantEnding = text.slice(-handler.mimMatchLength);
        let alertTestResult = process(significantEnding, 10, handler.regex);
        if (alertTestResult.matchCount > 0) {
          const otherHandlersMatch = textHandlers.some((otherHandler) => {
            // Exclude the current handler
            if (otherHandler.id === handler.id) return false;
    
            // Check if the other handler matches and has activeCount > 0
            const otherResult = process(significantEnding, 10, handler.regex);
            return otherResult.matchCount > 0 && otherHandler.activeCount > 0;
          });
    
          if (!otherHandlersMatch) {
            setTextHandlerAlerts((prev) => [...prev, handler.id]);
            setTimeout(() => setTextHandlerAlerts((prev) => prev.filter((id) => id !== handler.id)), 300);
          }
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
  return {
    ...context
  };
};
