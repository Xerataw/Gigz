import { SimpleGrid, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import fetchGenres from '../../../api/Genres.api';
import MusicGenreButton from '../../MusicGenreCard/MusicGenreButton';
import { StepProps } from '../AccountStep/FirstStep';
import Genre from '../../../types/Genre';

const FifthStepArtist: React.FC<StepProps> = ({ form }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
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
    fetchGenres()
      .then((res) => res.data ?? [])
      .then((res) => setGenres(res));
  }, []);

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

export default FifthStepArtist;