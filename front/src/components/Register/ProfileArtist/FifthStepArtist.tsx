import { SimpleGrid, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import fetchGenres, { Genre } from '../../../api/Genres.api';
import MusicGenreCard from '../../MusicGenreCard/MusicGenreCard';
import { StepProps } from '../AccountStep/FirstStep';

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
          <MusicGenreCard
            key={v4()}
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
