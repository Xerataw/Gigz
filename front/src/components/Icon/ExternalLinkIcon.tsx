// Sub components
import { Card, Center } from '@mantine/core';

interface IExternalLinkProps {
  link: string;
  logo: JSX.Element;
  background?: string;
}

const ExternalLinkIcon: React.FC<IExternalLinkProps> = ({
  link,
  logo,
  background,
}) => {
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
};

export default ExternalLinkIcon;
