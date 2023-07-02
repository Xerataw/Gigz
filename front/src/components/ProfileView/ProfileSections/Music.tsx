// Sub components
import ProfileSection from './ProfileSection';

export interface IMusicProps {
  musicLink?: string;
  youtubeLink?: string;
  spotifyLink?: string;
  deezerLink?: string;
  appleMusicLink?: string;
  soundCloudLink?: string;
}

enum MusicPlatform {
  SPOTIFY,
  APPLE_MUSIC,
  DEEZER,
  SOUNDCLOUND,
}

const handledEmbeds: Map<string, MusicPlatform> = new Map();
handledEmbeds.set('https://open.spotify.com/track/', MusicPlatform.SPOTIFY);

export default function Music({
  musicLink,
  youtubeLink,
  spotifyLink,
  soundCloudLink,
  deezerLink,
  appleMusicLink,
}: IMusicProps) {
  const getEmbedMusicPlatform = (): MusicPlatform | null => {
    if (!musicLink) return null;
    for (const linkStart of handledEmbeds.keys())
      if (musicLink.startsWith(linkStart))
        return handledEmbeds.get(linkStart) as MusicPlatform;
    return null;
  };

  const musicPlatform = getEmbedMusicPlatform();

  return (
    <ProfileSection name="Musique">
      <iframe
        src="https://open.spotify.com/embed/track/6XBaTMiZa77Du2XEl1RNaa"
        width="100%"
        height="10000"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </ProfileSection>
  );
}
