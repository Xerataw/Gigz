import { createContext, useContext, useEffect, useState } from 'react';
import { patchArtistProfile, patchHostProfile } from '../api/user';
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
  const userType = useUser().getProfileType() as EProfileType;

  // Edit mode management
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editConfirmed, setEditConfirmed] = useState<boolean>(false);
  const [updatedProfile, setUpdatedProfile] = useState<
    IHostProfile | IArtistProfile
  >({} as IArtistProfile | IHostProfile);

  // Values to edit
  const [editedName, setEditedName] = useState<string>('');

  const buildProfile = (): IArtistProfile | IHostProfile => {
    return {
      name: editedName,
      gallery: [],
      genres: [],
    };
  };

  // Send patch request if edit confirmed
  useEffect(() => {
    if (editConfirmed) {
      const valuesToUpdate = buildProfile();
      userType === EProfileType.ARTIST
        ? patchArtistProfile(valuesToUpdate).then((res) => {
            setUpdatedProfile(res.data as IArtistProfile);
          })
        : patchHostProfile(valuesToUpdate).then((res) =>
            setUpdatedProfile(res.data as IHostProfile)
          );
      setEditConfirmed(false);
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
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
