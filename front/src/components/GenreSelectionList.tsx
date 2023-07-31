import { SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getGenres } from '../api/genres';
import IGenre from '../types/IGenre';
import MusicGenreButton from './MusicGenreButton';

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
  const [allGenres, setAllGenres] = useState<IGenre[]>([]);
  const [genres, setGenres] = useState(allGenres);

  useEffect(() => {
    getGenres().then((res) => {
      setAllGenres(res?.data ?? []);
      setGenres(res?.data ?? []);
    });
  }, []);

  const filterGenres = (filter: string) => {
    const filteredGenres = allGenres.filter((genre: IGenre) => {
      return genre.name?.toLowerCase().includes(filter?.trim().toLowerCase());
    });
    console.log(filteredGenres);
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
