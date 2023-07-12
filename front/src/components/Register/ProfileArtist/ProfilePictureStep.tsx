import { ActionIcon, Button, FileButton, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import Profile from '../../../api/Profile.api';
import User from '../../../store/User';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';
import { IStepProps } from '../AccountStep/FirstStep';

const ProfilePictureStep: React.FC<IStepProps> = ({ form }) => {
  const [pictureLink, setPictureLink] = useState<string | undefined>(
    form.values.picture
  );
  const [username, setUsername] = useState<string>(
    form.values.name.length > 0 ? form.values.name : '@username'
  );
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setPictureLink(undefined);
    resetRef.current?.();
  };

  const handleChangeFile = (file: File) => {
    Profile.getProfilePicture(file)
      .then((res) => 'http://localhost:3000/static/' + res.data?.profilePicture)
      .then((pictureLink: string) => setPictureLink(pictureLink));
  };

  useEffect(() => {
    form.values.picture = pictureLink;
  }, [pictureLink]);

  useEffect(() => {
    User.getInstance().then((user) => {
      const userName = user.getName();
      const userProfilePicture = user.getProfilePicture();

      if (userName !== null) {
        setUsername(userName);
      }

      if (userProfilePicture !== null) {
        setPictureLink('http://localhost:3000/static/' + userProfilePicture);
      }
    });
  }, []);

  return (
    <>
      <Title mb="sm">À quoi vous ressemblez ?</Title>

      <div className="flex">
        <ProfilePicture alt="profile picture" src={pictureLink} />
        <div className="pl-4 flex flex-col justify-center">
          <h3 className="m-0">{username}</h3>
          <div className="flex justify-center items-center gap-2">
            <FileButton
              resetRef={resetRef}
              onChange={handleChangeFile}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Ajouter une image</Button>}
            </FileButton>
            <ActionIcon disabled={!pictureLink} color="red" onClick={clearFile}>
              <IconTrash />
            </ActionIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePictureStep;
