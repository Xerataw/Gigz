import { useEffect, useState } from 'react';
import GenreSelectionList from '../../GenreSelectionList';
import { Accordion, ScrollArea, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import GigzAccordion from '../../GigzAccordion';
import { useTranslation } from 'react-i18next';

interface IGenreSelectorProps {
  form: any;
  hidden?: boolean;
}

const GenreSelector: React.FC<IGenreSelectorProps> = ({
  form,
  hidden = false,
}) => {
  const { t } = useTranslation();

  const [selectedGenre, setSelectedGenre] = useState(form.values.genres ?? []);
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    form.values.genres = selectedGenre;
  }, [selectedGenre]);

  const handleAddGenre = (id: number) => {
    if (!selectedGenre.includes(id)) {
      setSelectedGenre((old: number[]) => [...old, id]);
    } else {
      setSelectedGenre((old: number[]) =>
        old.filter((idGenre) => idGenre !== id)
      );
    }
  };

  const header = (
    <TextInput
      icon={<IconSearch />}
      placeholder={t('search.genre')}
      variant="filled"
      radius="md"
      size="sm"
      onChange={(input) => setGenreFilter(input.currentTarget.value)}
    />
  );

  return (
    <GigzAccordion header={header} hidden={hidden}>
      <ScrollArea h="8rem">
        <GenreSelectionList
          selectedGenre={selectedGenre}
          handleAddGenre={handleAddGenre}
          filter={genreFilter}
        />
      </ScrollArea>
    </GigzAccordion>
  );
};

export default GenreSelector;
