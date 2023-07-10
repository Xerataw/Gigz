import { Avatar } from '@mantine/core';

const ProfilePicture = ({
  src,
  radius = 'xl',
  size = 'xl',
  alt,
}: {
  src: string | null | undefined;
  radius?: number | string;
  size?: number | string;
  alt: string | null | undefined;
}) => {
  return <Avatar radius={radius} size={size} src={src} alt={alt ?? ''} />;
};

export default ProfilePicture;
