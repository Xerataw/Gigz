import { SimpleGrid } from '@mantine/core';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { getGenres } from '../../api/genres';
import IGenre from '../../types/IGenre';
import { IStepProps } from '../../types/IStepProps';
import MusicGenreButton from '../MusicGenreButton';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const GenreStep: React.FC<IStepProps> = ({ form }) => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>(
    form.values.genres ?? []
  );

  const handleAddGenre = (addedGenre: IGenre) => {
    if (!selectedGenres.includes(addedGenre)) {
      setSelectedGenres((old) => [...old, addedGenre]);
    } else {
      setSelectedGenres((old) =>
        old.filter((idGenre) => idGenre != addedGenre)
      );
    }
  };

  useEffect(() => {
    form.values.genres = selectedGenres;
  }, [selectedGenres]);

  useEffect(() => {
    getGenres().then((res) => {
      if (res.data) setGenres(res.data);
    });
  }, []);

  return (
    <>
      <StepTitle label={t('register.genreStep.label')} />

      <Helper.UnderTitle label={t('register.genreStep.helper')}>
        {t('register.genreStep.max')}
      </Helper.UnderTitle>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[{ maxWidth: 'xs', cols: 2, spacing: 'sm' }]}
      >
        {genres.map((genre) => (
          <MusicGenreButton
            key={genre.id}
            onClick={() => {
              handleAddGenre(genre);
            }}
            //must be disabled if len >= 2 && selectedGenre doesn't includes it
            disabled={
              selectedGenres.length >= 2 &&
              selectedGenres.find((g) => g.id === genre.id) === undefined
            }
            isSelected={selectedGenres.includes(genre)}
            label={genre.name ?? 'No Label Set'}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GenreStep;
