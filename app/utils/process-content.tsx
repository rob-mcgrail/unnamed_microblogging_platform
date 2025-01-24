import { TextHandler } from "~/types";

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

const process = (
  text: string,
  persistentCount: number,
  regex: string
): { text: string; modifiedText: string; matchCount: number } => {
  let matchCount = 0;
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

export const processContent = (text: string, textHandlers: TextHandler[], setTextHandlerAlerts?: any, setInputAlert?: any) => {
  textHandlers.sort((a, b) => a.priority - b.priority);
  let processedText = text;

  textHandlers.forEach((handler) => {
    const result = process(processedText, handler.persistentCount, handler.regex);
    processedText = result.modifiedText;
    handler.activeCount = handler.persistentCount - result.matchCount;
    
    // If this handler is maxed out... should we trigger an alert?
    if (handler.activeCount < 1 && setTextHandlerAlerts) {
      handler.activeCount = 0;

      // Was it the last character that maxed us out?
      let significantEnding = text.slice(-handler.mimMatchLength);
      let alertTestResult = process(significantEnding, 10, handler.regex);
      if (alertTestResult.matchCount > 0) {

        // Avoiding alerting if we can still get the character from another handler...
        const otherHandlersMatchAndHaveTokens = textHandlers.some((otherHandler) => {
          if (otherHandler.id === handler.id) return false;  
          const otherResult = process(significantEnding, 10, otherHandler.regex);
          return otherResult.matchCount > 0 && otherHandler.activeCount > 0;
        });
  
        // Ok let's alert
        if (!otherHandlersMatchAndHaveTokens) {
          setTextHandlerAlerts((prev: any) => [...prev, handler.id]);
          setTimeout(() => setTextHandlerAlerts((prev: any[]) => prev.filter((id) => id !== handler.id)), 300);
        }
      }
      handler.alerted = true;
    }
    else {
      handler.alerted = false;
    }
  });
  
  // If we have some unaccounted for characters, after every handler, let's remove them
  if (processedText.length > 0) {
    text = removeCharactersFromBack(text, processedText);

    if (setInputAlert) {
      setInputAlert(true);
      setTimeout(() => setInputAlert(false), 300);
    }
  }

  return { text, textHandlers };
}