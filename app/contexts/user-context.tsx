import { createContext, useContext, useState, ReactNode } from "react";

import { User, Modifier } from "~/types";

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  modifiers: Modifier[];
  setModifiers: (modifier: Modifier[]) => void;
  activeModifiers: string[];
  setActiveModifiers: (activeModifiers: string[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, currentUser, currentModifiers }: { 
  children: ReactNode; currentUser: User, currentModifiers: Modifier[] }
) => {
  const [user, setUser] = useState<User>(currentUser);
  const [modifiers, setModifiers] = useState<Modifier[]>(currentModifiers);
  const [activeModifiers, setActiveModifiers] = useState<string[]>([]);

  return (
    <UserContext.Provider value={{ 
      user, setUser, modifiers, setModifiers, activeModifiers, setActiveModifiers
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
