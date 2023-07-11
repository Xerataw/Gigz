import { IChat } from '../types/IChat';
import GigzResponse from '../types/GigzResponse';

const DUMMY_DATA: IChat[] = [
  {
    id: 1,
    profilePicture: 'https://randomuser.me/api/portraits/women/40.jpg',
    unread: 2,
    from: 'Jane Doe',
    shortLastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididnt labore et dolore magna aliqua.',
    lastMessageDate: new Date(),
  },
  {
    id: 2,
    profilePicture: 'https://randomuser.me/api/portraits/women/14.jpg',
    unread: 0,
    from: 'Jane Doe',
    shortLastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididnt labore et dolore magna aliqua.',
    lastMessageDate: new Date(),
  },
  {
    id: 3,
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
    unread: 0,
    from: 'Jane Doe',
    shortLastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididnt labore et dolore magna aliqua.',
    lastMessageDate: new Date(),
  },
  {
    id: 4,
    profilePicture: 'https://randomuser.me/api/portraits/women/21.jpg',
    unread: 0,
    from: 'Jane Doe',
    shortLastMessage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    lastMessageDate: new Date(),
  },
];

export const getChatList = () => {
  return new Promise<GigzResponse<IChat[]>>((resolve, reject) => {
    setTimeout(() => {
      const response = {
        ok: true,
        code: 200,
        data: DUMMY_DATA,
      };
      resolve(response);
    }, 1000);
    // GigzFetcher.get<IChat[]>('/chat')
    //   .then((response) => {
    //     response.data = DUMMY_DATA;
    //     resolve(response);
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  });
};
