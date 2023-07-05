import { Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import fetchGenres from '../../../api/Genres.api';
import { StepProps } from '../AccountStep/FirstStep';

interface Genre {
  label: string;
  color: string;
  id: string;
}

const FifthStepArtist: React.FC<StepProps> = ({ form }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    fetchGenres().then((res) => console.log('res', res));
  }, []);

  return (
    <>
      <Title>Vous êtes plutôt ?</Title>
    </>
  );
};

export default FifthStepArtist;
