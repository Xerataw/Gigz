import React, { ReactNode, createContext, useContext, useState } from 'react';

interface IInitialLoadingContext {
  setUserLoading: (loading: boolean) => void;
  isLoading: boolean;
}

const InitialLoadingContext = createContext<IInitialLoadingContext>({
  setUserLoading: () => undefined,
  isLoading: true,
});

interface IInitialLoadingProviderProps {
  children: ReactNode;
}

export const useInitialLoading = () => useContext(InitialLoadingContext);

const InitialLoadingProvider: React.FC<IInitialLoadingProviderProps> = ({
  children,
}) => {
  const [userLoading, setUserLoading] = useState(true);

  const contextLoading = () => userLoading;

  return (
    <InitialLoadingContext.Provider
      value={{
        setUserLoading,
        isLoading: contextLoading(),
      }}
    >
      {children}
    </InitialLoadingContext.Provider>
  );
};

export default InitialLoadingProvider;
