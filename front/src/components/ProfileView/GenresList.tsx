import { Badge, Skeleton } from '@mantine/core';
import { IconSeparator, IconUsersGroup } from '@tabler/icons-react';
import ICapacity from '../../types/ICapacity';
import IGenre from '../../types/IGenre';

interface IGenresListProps {
  genres: IGenre[];
  loading: boolean;
  capacity?: ICapacity;
}

const GenresList: React.FC<IGenresListProps> = ({
  genres,
  loading,
  capacity,
}) => {
  return (
    <ul className="flex flex-row flex-nowrap p-0 m-0">
      {genres?.map((genre) => (
        <li key={genre.id} className="mr-1">
          <Skeleton
            h={loading ? '1.5rem' : 'inherit'}
            mr={loading ? '0.25rem' : 'inherit'}
            visible={loading}
          >
            <Badge variant="filled">{genre.name}</Badge>
          </Skeleton>
        </li>
      ))}
      {capacity && !loading && (
        <>
          {genres.length > 0 && <IconSeparator className="mr-2" />}
          <li>
            <Badge
              variant="filled"
              bg={capacity.bgColor}
              px={8}
              rightSection={
                <IconUsersGroup size="1rem" className="mt-[0.3rem]" />
              }
            >
              {capacity.max}
            </Badge>
          </li>
        </>
      )}
    </ul>
  );
};

export default GenresList;
