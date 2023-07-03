export interface ISpotifyEmbedProps {
  spotifyLink: string;
}

export default function SpotifyEmbed({ spotifyLink }: ISpotifyEmbedProps) {
  return (
    <div>
      <iframe
        style={{
          width: '75%',
          height: '80px',
          marginLeft: '12.5%',
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
