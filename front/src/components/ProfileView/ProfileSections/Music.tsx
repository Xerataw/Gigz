// Sub components
import MusicProfiles from '../MusicProfiles';
import MusicEmbed from './MusicEmbeds/MusicEmbed';
import ProfileSection from './ProfileSection';

export interface IMusicProps {
  musicLink?: string;
  youtubeLink?: string;
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundCloudLink?: string;
}

export default function Music({
  musicLink,
  youtubeLink,
  spotifyLink,
  soundCloudLink,
  deezerLink,
  appleMusicLink,
}: IMusicProps) {
  return (
    <ProfileSection name="Musique">
      {musicLink && <MusicEmbed musicLink={musicLink} />}
      <MusicProfiles
        spotifyLink={spotifyLink}
        soundCloudLink={soundCloudLink}
        deezerLink={deezerLink}
        appleMusicLink={appleMusicLink}
        youtubeLink={youtubeLink}
      />
    </ProfileSection>
  );
}
