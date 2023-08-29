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
import { IProfileEditValues } from '../types/IProfileEditValues';
import { useUser } from './UserProvider';

interface IProfileEditContext {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  editConfirmed: boolean;
  setEditConfirmed: (editConfirmed: boolean) => void;
  initialValues: IArtistProfile | IHostProfile;
  setInitialValues: (initialValues: IArtistProfile | IHostProfile) => void;
  updatedProfile: IArtistProfile | IHostProfile;
  setEditedName: (editedName: string) => void;
  setEditedPP: (editedPP: File | null) => void;
  setEditedBio: (editedBiography: string) => void;
  setEditedInsta: (editedInsta: string) => void;
  setEditedFacebook: (editedFacebook: string) => void;
  setEditedWebsite: (editedWebsite: string) => void;
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
  const [initialValues, setInitialValues] = useState<
    IArtistProfile | IHostProfile
  >();
  const [updatedProfile, setUpdatedProfile] = useState(
    {} as IArtistProfile | IHostProfile
  );

  // Values to edit
  const [editedName, setEditedName] = useState<string>('');
  const [editedPP, setEditedPP] = useState<File | null>(null);
  const [editedBio, setEditedBio] = useState<string>('');
  const [editedInsta, setEditedInsta] = useState<string>('');
  const [editedFacebook, setEditedFacebook] = useState<string>('');
  const [editedWebsite, setEditedWebsite] = useState<string>('');

  const getEditedValues = (): IProfileEditValues => {
    const editedProfileValues = {} as IProfileEditValues;
    if (editedName !== initialValues?.name)
      editedProfileValues.name = editedName;
    if (editedBio !== initialValues?.description)
      editedProfileValues.description = editedBio;
    if (editedInsta !== initialValues?.instagramLink)
      editedProfileValues.instagramLink = editedInsta;
    if (editedFacebook !== initialValues?.facebookLink)
      editedProfileValues.facebookLink = editedFacebook;
    if (editedWebsite !== initialValues?.websiteLink)
      editedProfileValues.websiteLink = editedWebsite;
    return editedProfileValues;
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
      const valuesToUpdate = getEditedValues();
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
        initialValues: initialValues as IArtistProfile | IHostProfile,
        setInitialValues,
        updatedProfile,
        setEditedName,
        setEditedPP,
        setEditedBio,
        setEditedInsta,
        setEditedFacebook,
        setEditedWebsite,
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
