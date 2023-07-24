import React, { ReactNode, createContext, useContext, useState } from 'react';

const InitialLoadingContext = createContext({
  setUserLoading: (loading: boolean) =>
    console.log(`Default method: ${loading}`),
  setGenresLoading: (loading: boolean) =>
    console.log(`Default method: ${loading}`),
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
  const [genresLoading, setGenresLoading] = useState(true);

  const contextLoading = () => userLoading || genresLoading;

  return (
    <InitialLoadingContext.Provider
      value={{
        setUserLoading,
        setGenresLoading,
        isLoading: contextLoading(),
      }}
    >
      {children}
    </InitialLoadingContext.Provider>
  );
};

export default InitialLoadingProvider;
