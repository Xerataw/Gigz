import GigzFetcher from '../../services/GigzFetcher';
import IGenre from '../../types/IGenre';
import { Avatar, Badge } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';

interface IProfileBannerProps {
  username: string;
  profilePicture?: string;
  city?: string;
  genres: IGenre[];
}

const ProfileBanner: React.FC<IProfileBannerProps> = ({
  username,
  profilePicture,
  city,
  genres,
}) => {
  return (
    <div className="bg-white pl-3 pr-3 rounded-tl-md rounded-tr-md">
      <span className="w-[15%] ml-[42.5%] inline-block h-1.5 bg-gray-700 rounded-md"></span>
      <div className="flex flex-row flex-nowrap items-center pt-3 pb-3">
        <Avatar
          src={profilePicture && GigzFetcher.getImageUri(profilePicture)}
          radius="xl"
          size="xl"
          className="mr-3"
        />
        <div>
          <div className="flex flex-row flex-nowrap items-center">
            <h3 className="pr-2">{username}</h3>
          </div>
          <div className="flex flex-row flex-nowrap">
            <IconMapPin size="20" className="mt-[2px]" />
            <p className="italic text-gray-600 font-semibold">
              {city ? city : 'Somewhere in the world'}
            </p>
          </div>
          <ul className="flex flex-row flew-wrap p-0 m-0">
            {genres.map((genre) => (
              <li key={genre.name} className="mr-1">
                <Badge variant="filled">{genre.name}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;