import React, { createContext, useContext, ReactNode } from "react";

import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

interface GlobalContextType {
  isLoggedIn: boolean;
  currentUser: User | null;
  loading: boolean;
  refetch: () => void;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: userData,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const currentUser = userData ?? null; // Ensure it's either a User object or null

  const isLoggedIn = !!currentUser;

  const safeRefetch = () => {
    refetch({}); // Ensure it gets an empty object to avoid argument issues
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        loading,
        refetch: safeRefetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
