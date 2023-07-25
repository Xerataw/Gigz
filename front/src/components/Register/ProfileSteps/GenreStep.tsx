import { Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import GenreSelectionList from '../../GenreSelectionList';
import { IStepProps } from '../AccountStep/FirstStep';

const GenreStep: React.FC<IStepProps> = ({ form }) => {
  const [selectedGenre, setSelectedGenre] = useState<number[]>(
    form.values.genres ?? []
  );

  const handleAddGenre = (id: number) => {
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
      <GenreSelectionList
        selectedGenre={selectedGenre}
        handleAddGenre={handleAddGenre}
      />
    </>
  );
};

export default GenreStep;
