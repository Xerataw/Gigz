import { useState } from 'react';

// Sub components
import { Skeleton } from '@mantine/core';

export interface ISpotifyEmbedProps {
  spotifyLink: string;
}

export default function SpotifyEmbed({ spotifyLink }: ISpotifyEmbedProps) {
  const [skeletonVisible, setSkeletonVisible] = useState<boolean>(true);

  return (
    <Skeleton
      visible={skeletonVisible}
      radius={skeletonVisible ? 'md' : undefined}
    >
      <iframe
        style={{
          width: '100%',
          height: '100px',
          border: '0',
          marginBottom: '10px',
        }}
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
}
