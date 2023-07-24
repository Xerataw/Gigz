import { SimpleGrid, Title } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { GenresContext } from '../../../store/GenresProvider';
import MusicGenreButton from '../../MusicGenreButton';
import { IStepProps } from '../AccountStep/FirstStep';

const GenreStep: React.FC<IStepProps> = ({ form }) => {
  const genres = useContext(GenresContext);
  const [selectedGenre, setSelectedGenre] = useState<string[]>(
    form.values.genres ?? []
  );

  const handleAddGenre = (id: string) => {
    if (!selectedGenre.includes(id)) {
      setSelectedGenre((old) => [...old, id]);
    } else {
      setSelectedGenre((old) => old.filter((idGenre) => idGenre != id));
    }
  };

  useEffect(() => {
    form.values.genres = selectedGenre;
  }, [selectedGenre]);

  return (
    <>
      <Title>Vous êtes plutôt ?</Title>
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
    </>
  );
};

export default GenreStep;
