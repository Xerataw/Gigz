// Sub components
import { Card, Center } from '@mantine/core';

export interface ISocialMediaCardProps {
  link: string;
  logo: JSX.Element;
}

export default function SocialMediaCard({ link, logo }: ISocialMediaCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card shadow="sm" radius="md" padding="lg">
        <Center>{logo}</Center>
      </Card>
    </a>
  );
}
