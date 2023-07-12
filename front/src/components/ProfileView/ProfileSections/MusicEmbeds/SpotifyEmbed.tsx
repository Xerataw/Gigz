import { useState } from 'react';
import { Skeleton } from '@mantine/core';

interface ISpotifyEmbedProps {
  spotifyLink: string;
}

const SpotifyEmbed: React.FC<ISpotifyEmbedProps> = ({ spotifyLink }) => {
  const [skeletonVisible, setSkeletonVisible] = useState<boolean>(true);

  return (
    <Skeleton
      visible={skeletonVisible}
      radius={skeletonVisible ? 'md' : undefined}
    >
      <iframe
        className="w-full h-32 border-0"
        src={`${spotifyLink.replace(
          '/track',
          '/embed/track'
        )}?utm_source=generator&theme=0`}
        loading="lazy"
        onLoad={() => {
          setSkeletonVisible(false);
        }}
      ></iframe>
    </Skeleton>
  );
};

export default SpotifyEmbed;
