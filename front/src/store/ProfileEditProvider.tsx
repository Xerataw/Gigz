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
  changeAfterEdit: boolean;
  setEditedName: (editedName: string) => void;
  setEditedPP: (editedPP: File | null) => void;
  setEditedBio: (editedBiography: string) => void;
  setEditedInsta: (editedInsta: string) => void;
  setEditedFacebook: (editedFacebook: string) => void;
  setEditedWebsite: (editedWebsite: string) => void;
  setEditedSpotify: (editedSpotify: string) => void;
  setEditedDeezer: (editedSpotify: string) => void;
  setEditedAppleMusic: (editedSpotify: string) => void;
  setEditedYoutube: (editedSpotify: string) => void;
  setEditedSoundcloud: (editedSpotify: string) => void;
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
  const [changeAfterEdit, setChangeAfterEdit] = useState<boolean>(false);

  // Values to edit
  const [editedName, setEditedName] = useState<string>();
  const [editedPP, setEditedPP] = useState<File | null | undefined>(undefined);
  const [editedBio, setEditedBio] = useState<string>();
  const [editedInsta, setEditedInsta] = useState<string>();
  const [editedFacebook, setEditedFacebook] = useState<string>();
  const [editedWebsite, setEditedWebsite] = useState<string>();
  const [editedSpotify, setEditedSpotify] = useState<string>();
  const [editedDeezer, setEditedDeezer] = useState<string>();
  const [editedAppleMusic, setEditedAppleMusic] = useState<string>();
  const [editedYoutube, setEditedYoutube] = useState<string>();
  const [editedSoundcloud, setEditedSoundcloud] = useState<string>();

  const getEditedValues = (): IProfileEditValues => {
    const editedProfileValues = {} as IProfileEditValues;
    if (editedName !== undefined && editedName !== initialValues?.name)
      editedProfileValues.name = editedName;
    if (editedBio !== undefined && editedBio !== initialValues?.description)
      editedProfileValues.description = editedBio;
    if (
      editedInsta !== undefined &&
      editedInsta !== initialValues?.instagramLink
    )
      editedProfileValues.instagramLink = editedInsta;
    if (
      editedFacebook !== undefined &&
      editedFacebook !== initialValues?.facebookLink
    )
      editedProfileValues.facebookLink = editedFacebook;
    if (
      editedWebsite !== undefined &&
      editedWebsite !== initialValues?.websiteLink
    )
      editedProfileValues.websiteLink = editedWebsite;
    if (
      editedSpotify !== undefined &&
      editedSpotify !== (initialValues as IArtistProfile)?.spotifyLink
    )
      editedProfileValues.spotifyLink = editedSpotify;
    if (
      editedDeezer !== undefined &&
      editedDeezer !== (initialValues as IArtistProfile)?.deezerLink
    )
      editedProfileValues.deezerLink = editedDeezer;
    if (
      editedAppleMusic !== undefined &&
      editedAppleMusic !== (initialValues as IArtistProfile)?.appleMusicLink
    )
      editedProfileValues.appleMusicLink = editedAppleMusic;
    if (
      editedYoutube !== undefined &&
      editedYoutube !== (initialValues as IArtistProfile)?.youtubeLink
    )
      editedProfileValues.youtubeLink = editedYoutube;
    if (
      editedSoundcloud !== undefined &&
      editedSoundcloud !== (initialValues as IArtistProfile)?.soundcloudLink
    )
      editedProfileValues.soundcloudLink = editedSoundcloud;
    return editedProfileValues;
  };

  const onProfileUpdated = (
    newProfile: IArtistProfile | IHostProfile
  ): void => {
    if (editedPP)
      patchProfilePicture(editedPP).then((response) => {
        user.setProfilePicture(response.data ? response.data.media : null);
        setUpdatedProfile({
          ...newProfile,
          profilePicture:
            user.getProfilePicture() !== null
              ? { media: user.getProfilePicture() as string }
              : undefined,
        });
        setChangeAfterEdit(true);
        setEditConfirmed(false);
      });
    else if (editedPP === null)
      deleteProfilePicture().then(() => {
        user.setProfilePicture(null);
        setUpdatedProfile({
          ...newProfile,
          profilePicture:
            user.getProfilePicture() !== null
              ? { media: user.getProfilePicture() as string }
              : undefined,
        });
        setChangeAfterEdit(true);
        setEditConfirmed(false);
      });
    else {
      setUpdatedProfile({
        ...newProfile,
        profilePicture:
          user.getProfilePicture() !== null
            ? { media: user.getProfilePicture() as string }
            : undefined,
      });
      setChangeAfterEdit(true);
      setEditConfirmed(false);
    }
  };

  // Send patch request if edit confirmed
  useEffect(() => {
    if (editConfirmed) {
      const valuesToUpdate = getEditedValues();
      if (Object.keys(valuesToUpdate).length === 0 && editedPP === undefined) {
        setChangeAfterEdit(false);
        setEditConfirmed(false);
        return;
      }
      if (Object.keys(valuesToUpdate).length === 0)
        onProfileUpdated(initialValues as IArtistProfile | IHostProfile);
      else {
        (user.getProfileType() as EProfileType) === EProfileType.ARTIST
          ? patchArtistProfile(valuesToUpdate as IArtistProfile).then((res) => {
              onProfileUpdated(res.data as IArtistProfile);
            })
          : patchHostProfile(valuesToUpdate as IHostProfile).then((res) =>
              onProfileUpdated(res.data as IHostProfile)
            );
      }
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
        changeAfterEdit,
        setEditedName,
        setEditedPP,
        setEditedBio,
        setEditedInsta,
        setEditedFacebook,
        setEditedWebsite,
        setEditedSpotify,
        setEditedDeezer,
        setEditedAppleMusic,
        setEditedYoutube,
        setEditedSoundcloud,
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
