import { Avatar } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

interface IProfilePictureProps {
  src: string | null | undefined;
  radius?: number | string;
  size?: number | string;
  alt: string | null | undefined;
}

const ProfilePicture : React.FC<IProfilePictureProps> = ({
  src,
  radius = 'xl',
  size = 'xl',
  alt,
}) => {
  return (
    <Avatar radius={radius} size={size} src={src} alt={alt ?? ''}>
      <IconUserCircle size="50" />
    </Avatar>
  );
};

export default ProfilePicture;
