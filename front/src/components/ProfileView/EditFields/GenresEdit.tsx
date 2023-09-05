import { ActionIcon, Badge, Popover, Skeleton } from '@mantine/core';
import IGenre from '../../../types/IGenre';
import { ReactNode, useState, useEffect } from 'react';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import { IconPlus, IconX } from '@tabler/icons-react';
import AddGenresList from './AddGenresList';
import { getGenres } from '../../../api/genres';

interface IGenresEditProps {
  defaultGenres?: IGenre[];
}

const GenresEdit: React.FC<IGenresEditProps> = ({ defaultGenres }) => {
  const { addGenre, removeGenre } = useProfileEdit();
  const [allGenres, setAllGenres] = useState<IGenre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentGenres, setCurrentGenres] = useState(defaultGenres);
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

  const onGenreAdd = (newGenre: IGenre) => {
    setPopoverOpened(false);
    addGenre(newGenre);
    const newCurrentGenres: IGenre[] = [];
    if (currentGenres !== undefined)
      for (const genre of currentGenres) newCurrentGenres.push(genre);
    newCurrentGenres.push(newGenre);
    setCurrentGenres(newCurrentGenres);
  };

  const onGenreRemove = (genreToRemove: IGenre) => {
    removeGenre(genreToRemove);
    let newCurrentGenres: IGenre[] = [];
    if (currentGenres !== undefined)
      for (const genre of currentGenres) newCurrentGenres.push(genre);
    newCurrentGenres = newCurrentGenres.filter(
      (genre) => genre.name !== genreToRemove.name
    );
    setCurrentGenres(newCurrentGenres);
  };

  const removeButton = (genre: IGenre): ReactNode => {
    return (
      <ActionIcon
        size="xs"
        variant="transparent"
        className="-ml-2"
        onClick={() => onGenreRemove(genre)}
      >
        <IconX color="white" />
      </ActionIcon>
    );
  };

  useEffect(() => {
    getGenres().then((res) => {
      setAllGenres(res.data as IGenre[]);
      setLoading(false);
    });
  }, []);

  return (
    <ul className="flex flex-row flew-wrap p-0 m-0 mt-1">
      {currentGenres?.map((genre) => (
        <li key={genre.id} className="mr-1 flex flex-row flex-nowrap gap-2">
          <Skeleton
            h={loading ? '1.5rem' : 'inherit'}
            mr={loading ? '0.25rem' : 'inherit'}
            visible={loading}
          >
            <Badge variant="filled" leftSection={removeButton(genre)}>
              {genre.name}
            </Badge>
          </Skeleton>
        </li>
      ))}
      {!loading && currentGenres !== undefined && currentGenres.length < 2 && (
        <li
          key="genre-add-btn"
          className="mr-1 flex flex-row flex-nowrap gap-2"
        >
          <Popover
            opened={popoverOpened}
            onClose={() => setPopoverOpened(false)}
            closeOnEscape={false}
          >
            <Popover.Target>
              <Badge variant="light" color="gray" className="bg-gray-300">
                <ActionIcon
                  size="xs"
                  variant="transparent"
                  onClick={() => setPopoverOpened(true)}
                >
                  <IconPlus color="#4b5563" />
                </ActionIcon>
              </Badge>
            </Popover.Target>
            <Popover.Dropdown>
              <AddGenresList
                allGenres={allGenres.filter(
                  (genre) =>
                    currentGenres.find(
                      (currentGenre) => currentGenre.id === genre.id
                    ) === undefined
                )}
                onGenreSelected={onGenreAdd}
              />
            </Popover.Dropdown>
          </Popover>
        </li>
      )}
    </ul>
  );
};

export default GenresEdit;
