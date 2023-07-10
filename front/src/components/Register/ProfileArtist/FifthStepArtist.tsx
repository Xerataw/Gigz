import { SimpleGrid, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import fetchGenres, { Genre } from '../../../api/Genres.api';
import MusicGenreCard from '../../MusicGenreCard/MusicGenreCard';
import { StepProps } from '../AccountStep/FirstStep';

const FifthStepArtist: React.FC<StepProps> = ({ form }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres()
      .then((res) => res.data ?? [])
      .then((res) => setGenres(res));
  }, []);

  useEffect(() => {
    console.log('update genres :', genres);
  }, [genres]);

  return (
    <>
      <Title>Vous êtes plutôt ?</Title>
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 4, spacing: 'md' },
          { maxWidth: 'sm', cols: 3, spacing: 'sm' },
          { maxWidth: 'xs', cols: 2, spacing: 'sm' },
        ]}
      >
        {genres.map((genre) => (
          <MusicGenreCard
            key={v4()}
            color={genre.color ?? '#DF6600'}
            label={genre.name ?? 'No Label Set'}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default FifthStepArtist;
