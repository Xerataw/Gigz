import { ActionIcon, FileButton, useMantineColorScheme } from '@mantine/core';
import { IconPhotoEdit, IconPhotoPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import GigzFetcher from '../../../services/GigzFetcher';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import ProfilePicture from '../../ProfilePicture';

interface IProfilePictureEditProps {
  profilePicture: string | null;
  name: string;
}

const ProfilePictureEdit: React.FC<IProfilePictureEditProps> = ({
  profilePicture,
  name,
}) => {
  const { setEditedPP } = useProfileEdit();
  const [currentPP, setCurrentPP] = useState<string | null>(
    profilePicture ? GigzFetcher.getImageUri(profilePicture) : null
  );

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const fileToBase64 = (file: File | null): Promise<string | null> =>
    new Promise((resolve, reject) => {
      if (file === null) resolve(null);
      else {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.readAsDataURL(file);
        reader.onerror = reject;
      }
    });

  const updatePP = (newPP: File | null) => {
    fileToBase64(newPP).then((base64PP) => {
      if (base64PP !== null) {
        setCurrentPP(base64PP);
        setEditedPP(newPP);
      }
    });
  };

  const deletePP = () => {
    setCurrentPP(null);
    setEditedPP(null);
  };

  return (
    <div className="relative">
      {currentPP !== null && (
        <ActionIcon
          className={
            'w-[2rem] h-[2rem] absolute -left-2 -top-2 z-[11] rounded-full p-1' +
            (isDark ? ' bg-[#1A1B1E] ' : ' bg-white ')
          }
          onClick={() => deletePP()}
        >
          <IconTrash width="100%" color="red" />
        </ActionIcon>
      )}
      <FileButton onChange={updatePP} accept="image/png,image/jpeg,image/jpg">
        {(props) => (
          <ActionIcon
            {...props}
            className={
              'w-[2rem] h-[2rem] absolute -right-2 -top-2 z-[11] rounded-full p-1 m-0' +
              (isDark ? ' bg-[#1A1B1E] ' : ' bg-white ')
            }
          >
            {currentPP === null ? (
              <IconPhotoPlus width="100%" color="black" />
            ) : (
              <IconPhotoEdit width="100%" color="black" />
            )}
          </ActionIcon>
        )}
      </FileButton>
      <ProfilePicture src={currentPP} radius="xl" size="xl" alt={name} />
    </div>
  );
};

export default ProfilePictureEdit;
