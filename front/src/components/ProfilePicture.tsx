import { Avatar } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

interface IProfilePictureProps {
  src: string | null | undefined;
  radius?: number | string;
  size?: number | string;
  alt: string | null | undefined;
}

const ProfilePicture = ({
  src,
  radius = 'xl',
  size = 'xl',
  alt,
}: IProfilePictureProps) => {
  return (
    <Avatar radius={radius} size={size} src={src} alt={alt ?? ''}>
      <IconUserCircle size="3rem" />
    </Avatar>
  );
};

export default ProfilePicture;
