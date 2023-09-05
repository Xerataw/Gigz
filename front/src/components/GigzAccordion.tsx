import { Accordion, createStyles, rem } from '@mantine/core';
import React from 'react';

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

interface IGigzAccordionProps {
  header: any;
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}

const GigzAccordion: React.FC<IGigzAccordionProps> = ({
  header,
  children,
  className,
  hidden = false,
}) => {
  const { classes } = useStyles();
  return (
    <Accordion
      mx="auto"
      variant="filled"
      classNames={classes}
      className={[classes.root, className ?? ''].join(' ')}
      hidden={hidden}
    >
      <Accordion.Item value="gigz-accordion">
        <Accordion.Control>{header}</Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default GigzAccordion;
