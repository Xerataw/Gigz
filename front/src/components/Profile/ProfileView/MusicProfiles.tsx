// Sub components
import SocialMediaCard from './ProfileSections/SocialMediaCard/SocialMediaCard';
import {
  IconBrandApple,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandYoutube,
} from '@tabler/icons-react';

export interface IMusicProfilesProps {
  spotifyLink?: string;
  appleMusicLink?: string;
  deezerLink?: string;
  soundCloudLink?: string;
  youtubeLink?: string;
}

export default function MusicProfiles({
  spotifyLink,
  appleMusicLink,
  deezerLink,
  soundCloudLink,
  youtubeLink,
}: IMusicProfilesProps) {
  return (
    <ul className="flex flex-row flex-wrap justify-around">
      {spotifyLink && (
        <li>
          <SocialMediaCard
            link={spotifyLink}
            logo={<IconBrandSpotify color="white" size="32" />}
            background="#1DB954"
          />
        </li>
      )}
      {deezerLink && (
        <li>
          <SocialMediaCard
            link={deezerLink}
            logo={
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nGNgGAWjYBTQGEiuivmPjiVWx4bS2l44GHWAxOrYUHQsvTZahmFIgY+7JYo+7hZfjYoliojRKzi7azU6FprVYUGiA8RXf9wj8R8F7xZfTYxeodld/zHwnK7QoeYAiYGNggEHb1KMLN6mGYQiY5AYSG6/Wa7MXuPMUHQM08vfsj0UHQvVbyMtG75N1V/9Ns3gPwpO1QenAaiF/9ExTK9Ay7b/6BjkiFEHMIwCdPCzTfg/Bm4XAgfVNV+X1dd8Xf+jYhdwIswxaA/N1W//j45h5gpmnP+PjoUyz2NGwc9RB7QLhaLjrx1C4ALjmq+LxVU/11BkDBIDyeXqdsiAogEdw0IWFNwYOOXiEGsPjIJRwEBDAAAG0fix2AHJfwAAAABJRU5ErkJggg==" />
            }
          />
        </li>
      )}
      {youtubeLink && (
        <li>
          <SocialMediaCard
            link={youtubeLink}
            logo={<IconBrandYoutube color="white" size="32" />}
            background="#FF0000"
          />
        </li>
      )}
      {appleMusicLink && (
        <li>
          <SocialMediaCard
            link={appleMusicLink}
            logo={<IconBrandApple size="32" />}
          />
        </li>
      )}
      {soundCloudLink && (
        <li>
          <SocialMediaCard
            link={soundCloudLink}
            logo={<IconBrandSoundcloud color="white" size="32" />}
            background="#ff8800"
          />
        </li>
      )}
    </ul>
  );
}
