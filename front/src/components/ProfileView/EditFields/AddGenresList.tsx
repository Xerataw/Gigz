import { Chip } from '@mantine/core';
import IGenre from '../../../types/IGenre';

interface IAddGenresListProps {
  allGenres: IGenre[];
  onGenreSelected: (genre: IGenre) => void;
}

const AddGenresList: React.FC<IAddGenresListProps> = ({
  allGenres,
  onGenreSelected,
}) => {
  return (
    <ul className="w-[12rem] flex flex-row flex-wrap">
      {allGenres.map((genre) => (
        <li key={genre.id} className="my-[0.2rem] mr-[0.2rem]">
          <Chip defaultChecked={false} onChange={() => onGenreSelected(genre)}>
            {genre.name}
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default AddGenresList;
