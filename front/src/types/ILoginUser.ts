import EProfileType from './EProfileType';

export default interface ILoginUser {
  profilePicture: string | null;
  profileType: EProfileType;
  token: string;
  username: string;
  userId: string;
}
