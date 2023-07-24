import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import User from './User';
import { useInitialLoading } from './InitialLoadingProvider';

interface IUserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<User>({} as User);

export const useUser = () => useContext(UserContext);

const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const setUserLoading = useInitialLoading().setUserLoading;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    User.getInstance().then((user) => {
      setUserLoading(false);
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user as User}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
