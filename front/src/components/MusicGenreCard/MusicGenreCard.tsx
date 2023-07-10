import { Button } from '@mantine/core';
import stc from 'string-to-color';

interface Props {
  label: string;
}

const MusicGenreCard: React.FC<Props> = ({ label }) => {
  return (
    <Button
      style={{
        borderColor: 'black',
        color: 'black',
        backgroundColor: stc(label),
      }}
      variant="outline"
    >
      {label}
    </Button>
  );
};

export default MusicGenreCard;
