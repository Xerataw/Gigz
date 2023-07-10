import { Button } from '@mantine/core';

interface Props {
  label: string;
  color: string;
}

const getFadeColor = (baseColor: string): string => {
  const hexColor = baseColor.replace('#', '');
  const amount = 100;

  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);

  const updatedRed = Math.min(red + amount, 255);
  const updatedGreen = Math.min(green + amount, 255);
  const updatedBlue = Math.min(blue + amount, 255);

  const updatedHexColor =
    '#' +
    ((1 << 24) | (updatedRed << 16) | (updatedGreen << 8) | updatedBlue)
      .toString(16)
      .slice(1);

  return updatedHexColor;
};

const MusicGenreCard: React.FC<Props> = ({ label, color }) => {
  return (
    <Button
      style={{
        borderColor: color,
        color: color,
        backgroundColor: getFadeColor(color),
      }}
      variant="outline"
    >
      {label}
    </Button>
  );
};

export default MusicGenreCard;
