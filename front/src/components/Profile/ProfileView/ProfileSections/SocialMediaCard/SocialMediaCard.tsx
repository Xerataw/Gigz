// Sub components
import { Card, Center } from '@mantine/core';

export interface ISocialMediaCardProps {
  link: string;
  logo: JSX.Element;
  background?: string;
}

export default function SocialMediaCard({
  link,
  logo,
  background,
}: ISocialMediaCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        shadow="sm"
        radius="xl"
        padding="xs"
        style={{
          background: background && background,
        }}
      >
        <Center>{logo}</Center>
      </Card>
    </a>
  );
}
