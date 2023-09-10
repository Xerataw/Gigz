import IGenre from './IGenre';
import IMedia from './IMedia';
import IProfilePicture from './IProfilePicture';
import { IConversationDetails } from './chat/IChat';

export default interface IProfile {
  id: number;
  accountId: number;

  name: string;
  description?: string;

  websiteLink?: string;
  instagramLink?: string;
  facebookLink?: string;
  youtubeLink?: string;

  address?: string;
  city?: string;
  cityCode?: string;

  longitude?: number;
  latitude?: number;

  profilePicture?: IProfilePicture;
  genres: IGenre[];
  gallery: IMedia[];

  likedAccount: boolean;

  conversations: IConversationDetails[];
}
