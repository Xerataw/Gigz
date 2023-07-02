import { Badge } from '@mantine/core';
import GenreName from '../../types/GenreName';

export interface IGenreChipProps {
  name: GenreName;
  textColor: string;
  bgColor: string;
}

export default function GenreBadge({
  name,
  textColor,
  bgColor,
}: IGenreChipProps) {
  return (
    <Badge
      variant="filled"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {name}
    </Badge>
  );
}
