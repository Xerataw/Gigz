import {
  Accordion,
  Box,
  Button,
  Container,
  TextInput,
  createStyles,
  rem,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import EProfileType from '../../types/EProfileType';
import CapacityRange from './Filters/CapacityRange';
import GenreSelector from './Filters/GenreSelector';
import ProfileType from './Filters/ProfileType';
import LocationSelector from './Filters/LocationSelector';

interface ISearchBarProps {
  form: any;
  onSubmit: (values: any) => void;
}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#fff',
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}));

const SearchBar: React.FC<ISearchBarProps> = ({ form, onSubmit }) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Container className="w-90 flex justify-center flex-col mt-4">
      <form onSubmit={form.onSubmit((values: any) => onSubmit(values))}>
        <Accordion
          mx="auto"
          variant="filled"
          classNames={classes}
          className={classes.root}
        >
          <Accordion.Item value="search-accordion" className="pb-4">
            <Box className="p-2 flex ">
              <TextInput
                name="name"
                form={form}
                placeholder={t('search.placeholder')}
                radius="lg"
                size="md"
                icon={<IconSearch size="1.5rem" />}
                {...form.getInputProps('name')}
                className="w-full pl-2"
              />
              <Accordion.Control className="w-11 pr-1" />
            </Box>
            <Accordion.Panel>
              <div className="flex flex-col">
                <CapacityRange
                  form={form}
                  disabled={
                    form?.values?.type === EProfileType.ARTIST.toString()
                  }
                />
                <LocationSelector form={form} />
                <GenreSelector form={form} />
                <ProfileType form={form} />
                <Button type="submit" className="mt-2">
                  {t('search.sumbit')}
                </Button>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </form>
    </Container>
  );
};

export default SearchBar;
