import { Button } from '@mantine/core';

interface IMusicGenreButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
  disabled?: boolean;
}

const MusicGenreButton: React.FC<IMusicGenreButtonProps> = ({
  label,
  onClick,
  isSelected,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      color={isSelected ? '' : 'dark'}
      variant="outline"
    >
      {label}
    </Button>
  );
};

export default MusicGenreButton;
