// Sub components
import SocialMediaCard from './ProfileSections/SocialMediaCard/SocialMediaCard';
import {
  IconBrandApple,
  IconBrandDeezer,
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
          <SocialMediaCard link={spotifyLink} logo={<IconBrandSpotify />} />
        </li>
      )}
      {appleMusicLink && (
        <li>
          <SocialMediaCard link={appleMusicLink} logo={<IconBrandApple />} />
        </li>
      )}
      {deezerLink && (
        <li>
          <SocialMediaCard link={deezerLink} logo={<IconBrandDeezer />} />
        </li>
      )}
      {youtubeLink && (
        <li>
          <SocialMediaCard link={youtubeLink} logo={<IconBrandYoutube />} />
        </li>
      )}
      {soundCloudLink && (
        <li>
          <SocialMediaCard
            link={soundCloudLink}
            logo={<IconBrandSoundcloud />}
          />
        </li>
      )}
    </ul>
  );
}
