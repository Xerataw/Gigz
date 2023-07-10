export interface ISpotifyEmbedProps {
  spotifyLink: string;
}

export default function SpotifyEmbed({ spotifyLink }: ISpotifyEmbedProps) {
  return (
    <div>
      <iframe
        style={{
          width: '100%',
          height: '120px',
          border: '0',
          marginBottom: '10px',
        }}
        src={`${spotifyLink.replace(
          '/track',
          '/embed/track'
        )}?utm_source=generator&theme=0`}
        loading="lazy"
      ></iframe>
    </div>
  );
}
