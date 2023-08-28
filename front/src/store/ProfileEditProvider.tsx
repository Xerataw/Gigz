import { createContext, useContext, useEffect, useState } from 'react';
import {
  deleteProfilePicture,
  patchArtistProfile,
  patchHostProfile,
  patchProfilePicture,
} from '../api/user';
import EProfileType from '../types/EProfileType';
import IArtistProfile from '../types/IArtistProfile';
import IHostProfile from '../types/IHostProfile';
import { useUser } from './UserProvider';

interface IProfileEditContext {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  editConfirmed: boolean;
  setEditConfirmed: (editConfirmed: boolean) => void;
  updatedProfile: IArtistProfile | IHostProfile;
  setEditedName: (editedName: string) => void;
  setEditedPP: (editedPP: File | null) => void;
  setEditedBio: (editedBiography: string) => void;
}

const ProfileEditContext = createContext<IProfileEditContext>(
  {} as IProfileEditContext
);

export const useProfileEdit = () => useContext(ProfileEditContext);

interface IProfileEditProviderProps {
  children: React.ReactNode;
}

const ProfileEditProvider: React.FC<IProfileEditProviderProps> = ({
  children,
}) => {
  const user = useUser();

  // Edit mode management
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editConfirmed, setEditConfirmed] = useState<boolean>(false);
  const [updatedProfile, setUpdatedProfile] = useState(
    {} as IArtistProfile | IHostProfile
  );

  // Values to edit
  const [editedName, setEditedName] = useState<string>('');
  const [editedPP, setEditedPP] = useState<File | null>(null);
  const [editedBio, setEditedBio] = useState<string>('');

  const buildProfile = (): IArtistProfile | IHostProfile => {
    return {
      name: editedName,
      description: editedBio,
      gallery: [],
      genres: [],
    };
  };

  const onProfileUpdated = (
    newProfile: IArtistProfile | IHostProfile
  ): void => {
    if (editedPP !== null)
      patchProfilePicture(editedPP).then((response) => {
        user.setProfilePicture(response.data ? response.data.media : null);
        setUpdatedProfile({
          ...newProfile,
          profilePicture:
            user.getProfilePicture() !== null
              ? { media: user.getProfilePicture() as string }
              : undefined,
        });
        setEditConfirmed(false);
      });
    else
      deleteProfilePicture().then(() => {
        user.setProfilePicture(null);
        setUpdatedProfile({
          ...newProfile,
          profilePicture:
            user.getProfilePicture() !== null
              ? { media: user.getProfilePicture() as string }
              : undefined,
        });
        setEditConfirmed(false);
      });
  };

  // Send patch request if edit confirmed
  useEffect(() => {
    if (editConfirmed) {
      const valuesToUpdate = buildProfile();
      (user.getProfileType() as EProfileType) === EProfileType.ARTIST
        ? patchArtistProfile(valuesToUpdate as IArtistProfile).then((res) =>
            onProfileUpdated(res.data as IArtistProfile)
          )
        : patchHostProfile(valuesToUpdate as IHostProfile).then((res) =>
            onProfileUpdated(res.data as IHostProfile)
          );
    }
  }, [editConfirmed]);

  return (
    <ProfileEditContext.Provider
      value={{
        editMode,
        setEditMode,
        editConfirmed,
        setEditConfirmed,
        updatedProfile,
        setEditedName,
        setEditedPP,
        setEditedBio,
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
