import { ActionIcon, Button, FileButton } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { deleteProfilePicture, patchProfilePicture } from '../../api/user';
import GigzFetcher from '../../services/GigzFetcher';
import { useUser } from '../../store/UserProvider';
import { IStepProps } from '../../types/IStepProps';
import ProfilePicture from '../ProfilePicture';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const ProfilePictureStep: React.FC<IStepProps> = ({ form }) => {
  const user = useUser();
  const [pictureLink, setPictureLink] = useState<string | undefined>(
    form.values.picture
  );
  const username = form.values.name.length > 0 ? form.values.name : '@username';
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    deleteProfilePicture().then(() => {
      setPictureLink(undefined);
      resetRef.current?.();
    });
  };

  const handleChangeFile = (file: File) => {
    patchProfilePicture(file)
      .then((res) => {
        user.setProfilePicture(res.data?.media ?? '');
        return GigzFetcher.getImageUri(res.data?.media ?? '');
      })
      .then((pictureLink: string) => setPictureLink(pictureLink));
  };

  useEffect(() => {
    form.values.picture = pictureLink;
  }, [pictureLink]);

  return (
    <>
      <StepTitle label={t('register.profilePictureStep.label')} />
      <div className="flex">
        <ProfilePicture alt="profile picture" src={pictureLink} />
        <div className="pl-4 flex flex-col justify-center">
          <div className="m-0">
            <Helper.Label
              label={t('register.profilePictureStep.helper')}
              labelDirection="right"
            >
              <h3>{username}</h3>
            </Helper.Label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <FileButton
              resetRef={resetRef}
              onChange={handleChangeFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button {...props}>
                  {t('register.profilePictureStep.addPicture')}
                </Button>
              )}
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
