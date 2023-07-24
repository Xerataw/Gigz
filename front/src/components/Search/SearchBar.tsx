import {
  Accordion,
  RangeSlider,
  TextInput,
  createStyles,
  rem,
  Container,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface ISearchBarProps {
  form: any;
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

const SearchBar: React.FC<ISearchBarProps> = ({ form }) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  return (
    <Container className="w-90 flex justify-center flex-col mt-4">
      <Accordion
        mx="auto"
        variant="filled"
        defaultValue="customization"
        classNames={classes}
        className={classes.root}
      >
        <Accordion.Item value="customization" className="pb-4">
          <Accordion.Control>
            <TextInput
              placeholder={t('search.placeholder')}
              radius="lg"
              size="xl"
              icon={<IconSearch size="2rem" />}
            />
          </Accordion.Control>
          <Accordion.Panel>
            <RangeSlider
              step={1}
              marks={[
                { value: 25, label: '250' },
                { value: 50, label: '500' },
                { value: 75, label: '750' },
              ]}
              label={(value) => `${value * 10} people`}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default SearchBar;
