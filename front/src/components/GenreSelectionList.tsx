import { SimpleGrid } from '@mantine/core';
import MusicGenreButton from './MusicGenreButton';
import IGenre from '../types/IGenre';
import { useGenres } from '../store/GenresProvider';
import { useEffect, useState } from 'react';

interface IGenreSelectionListProps {
  selectedGenre: number[];
  handleAddGenre: (id: number) => void;
  filter?: string;
}

const GenreSelectionList: React.FC<IGenreSelectionListProps> = ({
  selectedGenre,
  handleAddGenre,
  filter,
}) => {
  const _genres = useGenres();
  const [genres, setGenres] = useState(_genres);

  const filterGenres = (filter: string) => {
    const filteredGenres = _genres.filter((genre: IGenre) => {
      return genre.name?.toLowerCase().includes(filter?.toLowerCase());
    });
    setGenres(filteredGenres);
  };

  useEffect(() => {
    filterGenres(filter ?? '');
  }, [filter]);

  return (
    <SimpleGrid
      cols={3}
      spacing="lg"
      breakpoints={[{ maxWidth: 'xs', cols: 2, spacing: 'sm' }]}
    >
      {genres.map((genre) => (
        <MusicGenreButton
          key={genre.id}
          onClick={() => {
            handleAddGenre(genre.id);
          }}
          isSelected={selectedGenre.includes(genre.id)}
          label={genre.name ?? 'No Label Set'}
        />
      ))}
    </SimpleGrid>
  );
};

export default GenreSelectionList;
