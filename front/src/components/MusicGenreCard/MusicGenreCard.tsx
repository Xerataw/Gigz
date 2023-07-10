import { Button, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import stc from 'string-to-color';

interface Props {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const MusicGenreCard: React.FC<Props> = ({ label, onClick, isSelected }) => {
  const color = stc(label);
  return (
    <Button
      onClick={onClick}
      styles={(theme) => ({
        root: {
          color: 'black',
          backgroundColor: color,
          border: 0,
          '&:not([data-disabled])': theme.fn.hover({
            backgroundColor: theme.fn.darken(color, 0.05),
          }),
        },
      })}
      variant="outline"
      leftIcon={
        isSelected ? (
          <ThemeIcon color="teal" radius="xl" size="sm">
            <IconCheck />
          </ThemeIcon>
        ) : null
      }
    >
      {label}
    </Button>
  );
};

export default MusicGenreCard;
