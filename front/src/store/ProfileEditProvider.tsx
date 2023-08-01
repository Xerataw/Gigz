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
  editMode: {
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
  };
  editConfirmed: {
    editConfirmed: boolean;
    setEditConfirmed: (editConfirmed: boolean) => void;
    updatedProfile: IArtistProfile | IHostProfile;
  };
  editedName: {
    editedName: string;
    setEditedName: (editedName: string) => void;
  };
  editedPP: {
    editedPP: File | null;
    setEditedPP: (editedPP: File | null) => void;
  };
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
  // Get profile type to define which update route to call
  const user = useUser();

  // Edit mode management
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editConfirmed, setEditConfirmed] = useState<boolean>(false);
  const [updatedProfile, setUpdatedProfile] = useState(
    {} as IArtistProfile | IHostProfile
  );
  const [editedPP, setEditedPP] = useState<File | null>(null);

  // Values to edit
  const [editedName, setEditedName] = useState<string>('');

  const buildProfile = (): IArtistProfile | IHostProfile => {
    return {
      name: editedName,
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
        editMode: {
          editMode,
          setEditMode,
        },
        editConfirmed: {
          editConfirmed,
          setEditConfirmed,
          updatedProfile,
        },
        editedName: {
          editedName,
          setEditedName,
        },
        editedPP: {
          editedPP,
          setEditedPP,
        },
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
