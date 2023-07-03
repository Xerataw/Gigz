import GenreName from '../../types/GenreName';
import IArtistProfile from '../../types/IArtistProfile';

// Sub components
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';
import ProfileView from '../../components/ProfileView/ProfileView';
import Biography from '../../components/ProfileView/ProfileSections/Biography';
import Socials from '../../components/ProfileView/ProfileSections/Socials';
import Music from '../../components/ProfileView/ProfileSections/Music';

const testProfile: IArtistProfile = {
  username: 'Alexis Moins 🚀',
  profilePicture:
    'data:image/jpeg;base64,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',
  bio: "Salut ! Moi c'est Alexis ! Je fais du metal depuis mes 2 mois et je rêve d'en vivre depuis des années.",
  city: 'Bordeaux',
  genres: [
    {
      name: GenreName.METAL,
      textColor: '#fff',
      bgColor: '#2b2d42',
    },
    {
      name: GenreName.HARD_ROCK,
      textColor: '#fff',
      bgColor: '#e63946',
    },
  ],
  mediaList: [],
  instagramLink: 'https://www.instagram.com/emmawatson/',
  facebookLink: 'https://www.facebook.com/emmawatson/',
  twitterLink: 'https://twitter.com/EmmaWatson',
  embedMusicLink: 'https://open.spotify.com/track/2QSKqb1s96PggfK0hv0W8u',
  spotifyLink: 'https://open.spotify.com/artist/3EhXtoOJDawjgbDPKcNDJB',
  appleMusicLink: 'https://music.apple.com/fr/artist/metallica/3996865',
  deezerLink: 'https://www.deezer.com/en/artist/1003683',
  soundCloudLink: 'https://soundcloud.com/sick_bee',
  youtubeLink: 'https://www.youtube.com/channel/UCVBXlR7YhYUr-DfNG1XLrHA',
};

const Profile: React.FC = () => {
  return (
    <div>
      <ProfileView profile={testProfile}>
        {testProfile.bio && <Biography content={testProfile.bio} />}
        <Socials
          instagramLink={testProfile.instagramLink}
          facebookLink={testProfile.facebookLink}
          twitterLink={testProfile.twitterLink}
        />
        <Music
          musicLink={testProfile.embedMusicLink}
          spotifyLink={testProfile.spotifyLink}
          soundCloudLink={testProfile.soundCloudLink}
          deezerLink={testProfile.deezerLink}
          youtubeLink={testProfile.youtubeLink}
          appleMusicLink={testProfile.appleMusicLink}
        />
      </ProfileView>
      <BottomNavbar />
    </div>
  );
};

export default Profile;
