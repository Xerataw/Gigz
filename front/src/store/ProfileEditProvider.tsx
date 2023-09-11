import { createContext, useContext, useEffect, useState } from 'react';
import {
  deleteGenresList,
  deleteProfilePicture,
  patchArtistProfile,
  patchHostProfile,
  patchProfilePicture,
  postGenresList,
} from '../api/user';
import EProfileType from '../types/EProfileType';
import IArtistProfile from '../types/IArtistProfile';
import IHostProfile from '../types/IHostProfile';
import IProfileEditValues from '../types/IProfileEditValues';
import { useUser } from './UserProvider';
import IGenre from '../types/IGenre';
import ICapacity from '../types/ICapacity';
import IHostProfileEditValues from '../types/IHostProfileEditValues';

interface IProfileEditContext {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  editConfirmed: boolean;
  setEditConfirmed: (editConfirmed: boolean) => void;
  initialValues: IArtistProfile | IHostProfile;
  setInitialValues: (initialValues: IArtistProfile | IHostProfile) => void;
  setEditedName: (editedName: string) => void;
  setEditedPP: (editedPP: File | null) => void;
  setEditedBio: (editedBiography: string) => void;
  setEditedInsta: (editedInsta: string) => void;
  setEditedFacebook: (editedFacebook: string) => void;
  setEditedWebsite: (editedWebsite: string) => void;
  setEditedMusicLink: (editedMusicLink: string) => void;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setCityCode: (cityCode: string) => void;
  setLongitude: (longitude: number) => void;
  setLatitude: (latitude: number) => void;
  setEditedSpotify: (editedSpotify: string) => void;
  setEditedDeezer: (editedSpotify: string) => void;
  setEditedAppleMusic: (editedSpotify: string) => void;
  setEditedYoutube: (editedSpotify: string) => void;
  setEditedSoundcloud: (editedSpotify: string) => void;
  addGenre: (newGenre: IGenre) => void;
  removeGenre: (genreToRemove: IGenre) => void;
  setEditedCapacity: (newCapacity: ICapacity) => void;
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
  const [genresUpdated, setGenresUpdated] = useState<boolean>(false);
  const [valuesToUpdate, setValuesToUpdate] = useState<IProfileEditValues>(
    {} as IProfileEditValues
  );

  // Values to edit
  const [editedName, setEditedName] = useState<string>();
  const [editedPP, setEditedPP] = useState<File | null | undefined>(undefined);
  const [editedBio, setEditedBio] = useState<string>();
  const [editedInsta, setEditedInsta] = useState<string>();
  const [editedFacebook, setEditedFacebook] = useState<string>();
  const [editedWebsite, setEditedWebsite] = useState<string>();
  const [editedMusicLink, setEditedMusicLink] = useState<string>();
  const [editedAddress, setEditedAddress] = useState<string>();
  const [editedCity, setEditedCity] = useState<string>();
  const [editedCityCode, setEditedCityCode] = useState<string>();
  const [editedLongitude, setEditedLongitude] = useState<number>();
  const [editedLatitude, setEditedLatitude] = useState<number>();
  const [editedSpotify, setEditedSpotify] = useState<string>();
  const [editedDeezer, setEditedDeezer] = useState<string>();
  const [editedAppleMusic, setEditedAppleMusic] = useState<string>();
  const [editedYoutube, setEditedYoutube] = useState<string>();
  const [editedSoundcloud, setEditedSoundcloud] = useState<string>();
  const [editedGenres, setEditedGenres] = useState<IGenre[]>();
  const [editedCapacity, setEditedCapacity] = useState<ICapacity>();

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
    if (editedAddress !== undefined && editedAddress !== initialValues?.address)
      editedProfileValues.address = editedAddress;
    if (editedCity !== undefined && editedCity !== initialValues?.city)
      editedProfileValues.city = editedCity;
    if (
      editedCityCode !== undefined &&
      editedCityCode !== initialValues?.cityCode
    )
      editedProfileValues.cityCode = editedCityCode;
    if (
      editedLongitude !== undefined &&
      editedLongitude !== initialValues?.longitude
    )
      editedProfileValues.longitude = editedLongitude;
    if (
      editedLatitude !== undefined &&
      editedLatitude !== initialValues?.latitude
    )
      editedProfileValues.latitude = editedLatitude;

    if (
      editedMusicLink !== undefined &&
      editedMusicLink !== (initialValues as IArtistProfile)?.musicLink
    )
      editedProfileValues.musicLink = editedMusicLink;
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
    if (editedGenres !== undefined) {
      const genresToAdd = getGenresToAdd();
      const genresToRemove = getGenresToRemove();
      if (genresToAdd.length > 0) editedProfileValues.genres = genresToAdd;
      if (genresToRemove.length > 0)
        editedProfileValues.genresToRemove = genresToRemove;
    }
    if (
      editedCapacity !== undefined &&
      editedCapacity !== (initialValues as IHostProfile).capacity
    )
      (editedProfileValues as IHostProfileEditValues).capacityId =
        editedCapacity.id;
    return editedProfileValues;
  };

  const getGenresToAdd = (): IGenre[] => {
    if (editedGenres === undefined) return [];

    const genresToAdd: IGenre[] = [];
    if (initialValues?.genres) {
      for (const editedGenre of editedGenres) {
        if (
          initialValues.genres.find(
            (initalGenre) => initalGenre.id === editedGenre.id
          ) === undefined
        )
          genresToAdd.push(editedGenre);
      }
    } else {
      for (const editedGenre of editedGenres) genresToAdd.push(editedGenre);
    }
    return genresToAdd;
  };

  const getGenresToRemove = (): IGenre[] => {
    if (editedGenres === undefined) return [];

    const genresToRemove: IGenre[] = [];
    if (initialValues?.genres) {
      for (const initialGenre of initialValues.genres) {
        if (
          editedGenres.find(
            (editedGenre) => editedGenre.id === initialGenre.id
          ) === undefined
        )
          genresToRemove.push(initialGenre);
      }
    }
    return genresToRemove;
  };

  const onProfileUpdated = (): void => {
    if (editedPP)
      patchProfilePicture(editedPP).then((response) => {
        user.setProfilePicture(response.data ? response.data.media : null);
        setEditConfirmed(false);
      });
    else if (editedPP === null)
      deleteProfilePicture().then(() => {
        user.setProfilePicture(null);
        setEditConfirmed(false);
      });
    else setEditConfirmed(false);
  };

  const addGenre = (newGenre: IGenre) => {
    const newEditedGenres: IGenre[] = [];
    if (editedGenres === undefined) {
      if (initialValues?.genres && initialValues.genres.length > 0)
        for (const genre of initialValues.genres) newEditedGenres.push(genre);
    } else {
      for (const genre of editedGenres) newEditedGenres.push(genre);
    }
    newEditedGenres.push(newGenre);
    setEditedGenres(newEditedGenres);
  };

  const removeGenre = (genreToRemove: IGenre) => {
    let newEditedGenres: IGenre[] = [];
    if (editedGenres === undefined) {
      if (initialValues?.genres && initialValues.genres.length > 0)
        for (const genre of initialValues.genres) newEditedGenres.push(genre);
    } else {
      for (const genre of editedGenres) newEditedGenres.push(genre);
    }
    newEditedGenres = newEditedGenres.filter(
      (genre) => genre.id !== genreToRemove.id
    );
    setEditedGenres(newEditedGenres);
  };

  // Send patch request if edit confirmed
  useEffect(() => {
    if (editConfirmed) {
      const valuesToUpdate = getEditedValues();
      if (!valuesToUpdate.genres && !valuesToUpdate.genresToRemove) {
        setValuesToUpdate(valuesToUpdate);
        setGenresUpdated(true);
      }

      // Post new genres
      if (valuesToUpdate.genres) {
        postGenresList(valuesToUpdate.genres).then(() => {
          delete valuesToUpdate.genres;
          if (valuesToUpdate.genresToRemove) {
            deleteGenresList(valuesToUpdate.genresToRemove).then(() => {
              delete valuesToUpdate.genresToRemove;
              setValuesToUpdate(valuesToUpdate);
              setGenresUpdated(true);
            });
          } else {
            setValuesToUpdate(valuesToUpdate);
            setGenresUpdated(true);
          }
        });
      } else if (valuesToUpdate.genresToRemove) {
        deleteGenresList(valuesToUpdate.genresToRemove).then(() => {
          delete valuesToUpdate.genresToRemove;
          setValuesToUpdate(valuesToUpdate);
          setGenresUpdated(true);
        });
      }
    }
  }, [editConfirmed]);

  useEffect(() => {
    if (genresUpdated) {
      if (Object.keys(valuesToUpdate).length === 0) {
        if (editedPP !== undefined) onProfileUpdated();
        else setEditConfirmed(false);
      } else {
        (user.getProfileType() as EProfileType) === EProfileType.ARTIST
          ? patchArtistProfile(valuesToUpdate as IArtistProfile).then(() =>
              onProfileUpdated()
            )
          : patchHostProfile(valuesToUpdate as IHostProfile).then(() =>
              onProfileUpdated()
            );
      }
      setGenresUpdated(false);
    }
  }, [genresUpdated]);

  return (
    <ProfileEditContext.Provider
      value={{
        editMode,
        setEditMode,
        editConfirmed,
        setEditConfirmed,
        initialValues: initialValues as IArtistProfile | IHostProfile,
        setInitialValues,
        setEditedName,
        setEditedPP,
        setEditedBio,
        setEditedInsta,
        setEditedFacebook,
        setEditedWebsite,
        setEditedMusicLink,
        setAddress: setEditedAddress,
        setCity: setEditedCity,
        setCityCode: setEditedCityCode,
        setLongitude: setEditedLongitude,
        setLatitude: setEditedLatitude,
        setEditedSpotify,
        setEditedDeezer,
        setEditedAppleMusic,
        setEditedYoutube,
        setEditedSoundcloud,
        addGenre,
        removeGenre,
        setEditedCapacity,
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
