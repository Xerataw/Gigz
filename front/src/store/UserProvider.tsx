import React, { ReactNode, createContext, useEffect, useState } from 'react';
import User from './User';

interface IUserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<User | null>(null);

const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    User.getInstance()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
