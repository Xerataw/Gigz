import { useMantineColorScheme } from '@mantine/core';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import User from '../types/User';
import { useInitialLoading } from './InitialLoadingProvider';

interface IUserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<User>({} as User);

export const useUser = () => useContext(UserContext);

const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const { toggleColorScheme } = useMantineColorScheme();

  const setUserLoading = useInitialLoading().setUserLoading;
  const [user, setUser] = useState<User>();
  const { i18n } = useTranslation();

  useEffect(() => {
    User.getInstance().then((user) => {
      i18n.changeLanguage(user.getLanguage());
      toggleColorScheme(user.getTheme());

      setUserLoading(false);
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user as User}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
