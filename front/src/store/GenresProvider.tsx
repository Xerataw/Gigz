import React, { ReactNode, createContext, useEffect, useState } from 'react';
import IGenre from '../types/IGenre';
import getGenres from '../api/genres';

interface IGenresProviderProps {
  children: ReactNode;
}

export const GenresContext = createContext<IGenre[]>([]);

const GenresProvider: React.FC<IGenresProviderProps> = ({ children }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    getGenres().then((response) => {
      if (response.data) setGenres(response.data);
    });
  }, []);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
};

export default GenresProvider;
