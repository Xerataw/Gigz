// Sub components
import { Card, Center } from '@mantine/core';

export interface IExternalLinkProps {
  link: string;
  logo: JSX.Element;
  background?: string;
}

export default function ExternalLinkIcon({
  link,
  logo,
  background,
}: IExternalLinkProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <Card
        shadow="sm"
        radius="xl"
        padding="xs"
        style={{
          background: background,
        }}
      >
        <Center>{logo}</Center>
      </Card>
    </a>
  );
}
