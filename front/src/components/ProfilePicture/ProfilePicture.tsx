import { Avatar } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

const ProfilePicture = ({
  src,
  radius = 'xl',
  size = 'xl',
  alt,
  placeholderIcon = false,
}: {
  src: string | null | undefined;
  radius?: number | string;
  size?: number | string;
  alt: string | null | undefined;
  placeholderIcon?: boolean;
}) => {
  return (
    <Avatar radius={radius} size={size} src={src} alt={alt ?? ''}>
      {placeholderIcon === true && <IconUserCircle size="3rem" />}
    </Avatar>
  );
};

export default ProfilePicture;
