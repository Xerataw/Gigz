// Embeds
import SpotifyEmbed from './SpotifyEmbed';

interface IMusicEmbedProps {
  musicLink: string;
}

const MusicEmbed: React.FC<IMusicEmbedProps> = ({ musicLink }) => {
  const handledEmbeds: Map<string, JSX.Element> = new Map();
  handledEmbeds.set(
    'https://open.spotify.com/track/',
    <SpotifyEmbed spotifyLink={musicLink} />
  );

  const getEmbedFromMusicLink = (): JSX.Element | null => {
    if (!musicLink) return null;
    for (const linkStart of handledEmbeds.keys())
      if (musicLink.startsWith(linkStart))
        return handledEmbeds.get(linkStart) as JSX.Element;
    return null;
  };

  return getEmbedFromMusicLink();
};

export default MusicEmbed;
