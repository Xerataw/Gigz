import Genre from '../../../types/Genre';

// Sub components
import { Avatar } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import GenreBadge from '../../GenreBadge/GenreBadge';

export interface IProfileBannerProps {
  username: string;
  profilePicture?: string;
  city?: string;
  genres: Genre[];
}

export default function ProfileBanner({
  username,
  profilePicture,
  city,
  genres,
}: IProfileBannerProps) {
  return (
    <div
      className="bg-white"
      style={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      <span
        className="inline-block h-1.5 bg-gray-700 rounded-md"
        style={{ width: '15%', marginLeft: '42.5%' }}
      ></span>
      <div className="flex flex-row flex-nowrap items-center p-3">
        <Avatar
          src={profilePicture && profilePicture}
          radius="xl"
          size="xl"
          className="mr-3"
        />
        <div>
          <div className="flex flex-row flex-nowrap items-center">
            <h3 className="pr-2">{username}</h3>
          </div>
          <div className="flex flex-row flex-nowrap">
            <IconMapPin size="20" style={{ marginTop: '2px' }} />
            <p className="italic text-gray-600 font-semibold">
              {city ? city : 'Somewhere in the world'}
            </p>
          </div>
          <ul className="flex flex-row flew-wrap p-0 m-0">
            {genres.map((genre) => (
              <li key={genre.name} className="mr-1">
                <GenreBadge
                  name={genre.name}
                  textColor={genre.textColor}
                  bgColor={genre.bgColor}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
