import { Button } from '@mantine/core';

interface IMusicGenreButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const MusicGenreButton: React.FC<IMusicGenreButtonProps> = ({
  label,
  onClick,
  isSelected,
}) => {
  return (
    <Button
      onClick={onClick}
      styles={() => ({
        root: {
          color: isSelected ? '' : 'lightGrey',
        },
      })}
      variant={isSelected ? 'outline' : 'default'}
    >
      {label}
    </Button>
  );
};

export default MusicGenreButton;
