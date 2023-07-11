// Sub components
import ProfileSection from './ProfileSection';
import ExternalLinkIcon from '../../../Icon/ExternalLinkIcon';
import {
  IconBrandApple,
  IconBrandSoundcloud,
  IconBrandSpotify,
  IconBrandYoutube,
} from '@tabler/icons-react';

interface IMusicProps {
  youtubeLink?: string;
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundCloudLink?: string;
}

const MusicProfiles: React.FC<IMusicProps> = ({
  youtubeLink,
  spotifyLink,
  soundCloudLink,
  deezerLink,
  appleMusicLink,
}) => {
  return (
    <ProfileSection name="Venez m'écouter ici">
      <ul className="flex flex-row flex-wrap justify-start gap-4">
        {spotifyLink && (
          <li>
            <ExternalLinkIcon
              link={spotifyLink}
              logo={<IconBrandSpotify color="white" size="32" />}
              background="#1DB954"
            />
          </li>
        )}
        {deezerLink && (
          <li>
            <ExternalLinkIcon
              link={deezerLink}
              logo={
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nGNgGAWjYBTQGEiuivmPjiVWx4bS2l44GHWAxOrYUHQsvTZahmFIgY+7JYo+7hZfjYoliojRKzi7azU6FprVYUGiA8RXf9wj8R8F7xZfTYxeodld/zHwnK7QoeYAiYGNggEHb1KMLN6mGYQiY5AYSG6/Wa7MXuPMUHQM08vfsj0UHQvVbyMtG75N1V/9Ns3gPwpO1QenAaiF/9ExTK9Ay7b/6BjkiFEHMIwCdPCzTfg/Bm4XAgfVNV+X1dd8Xf+jYhdwIswxaA/N1W//j45h5gpmnP+PjoUyz2NGwc9RB7QLhaLjrx1C4ALjmq+LxVU/11BkDBIDyeXqdsiAogEdw0IWFNwYOOXiEGsPjIJRwEBDAAAG0fix2AHJfwAAAABJRU5ErkJggg==" />
              }
            />
          </li>
        )}
        {youtubeLink && (
          <li>
            <ExternalLinkIcon
              link={youtubeLink}
              logo={<IconBrandYoutube color="white" size="32" />}
              background="#FF0000"
            />
          </li>
        )}
        {appleMusicLink && (
          <li>
            <ExternalLinkIcon
              link={appleMusicLink}
              logo={<IconBrandApple size="32" />}
            />
          </li>
        )}
        {soundCloudLink && (
          <li>
            <ExternalLinkIcon
              link={soundCloudLink}
              logo={<IconBrandSoundcloud color="white" size="32" />}
              background="#ff8800"
            />
          </li>
        )}
      </ul>
    </ProfileSection>
  );
};

export default MusicProfiles;
