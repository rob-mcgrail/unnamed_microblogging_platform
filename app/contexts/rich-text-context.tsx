import { createContext, useContext, useState, ReactNode } from "react";

interface RichTextContextType {
  content: string;
  setContent: (value: string) => void;
}

const RichTextContext = createContext<RichTextContextType | undefined>(undefined);

export const RichTextProvider = ({ children }: { children: ReactNode }) => {

  const [content, setContent] = useState<string>("");

  return (
    <RichTextContext.Provider value={{ content, setContent }}>
      {children}
    </RichTextContext.Provider>
  );
}; 

export const useRichText = () => {
  const context = useContext(RichTextContext);
  if (!context) throw new Error("useFavoritesContext must be used within a FavoritesProvider");
  return context;
};