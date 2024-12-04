import React, { useState, createContext, ReactNode, useContext } from "react";

const AppContext = createContext<{
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  userId: null,
  setUserId: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };

export default function useAppState() {
  return useContext(AppContext);
}
