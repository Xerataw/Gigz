import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import getGenres from '../api/genres';
import IGenre from '../types/IGenre';
import { useInitialLoading } from './InitialLoadingProvider';

interface IGenresProviderProps {
  children: ReactNode;
}

const GenresContext = createContext<IGenre[]>([]);

export const useGenres = () => useContext(GenresContext);

const GenresProvider: React.FC<IGenresProviderProps> = ({ children }) => {
  const setGenresLoading = useInitialLoading().setGenresLoading;
  const [genres, setGenres] = useState<IGenre[]>([]);

  useEffect(() => {
    getGenres().then((response) => {
      if (response.data) {
        setGenresLoading(false);
        setGenres(response.data);
      }
    });
  }, []);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
};

export default GenresProvider;
