import React, { ReactNode, createContext, useContext } from 'react';

import { io, Socket } from 'socket.io-client';
import { useUser } from './UserProvider';

interface ISocketProviderProps {
  children: ReactNode;
}

const envVars = import.meta.env;
const SocketContext = createContext<Socket>({} as Socket);

export const useSocket = () => useContext(SocketContext);
const URL =
  envVars.VITE_ENV === 'DEV'
    ? envVars.VITE_GIGZ_API_URL_DEV
    : envVars.VITE_GIGZ_API_URL_PROD;

const SocketProvider: React.FC<ISocketProviderProps> = ({ children }) => {
  const user = useUser();

  const socket = io(URL, {
    auth: {
      userId: user.getUserId(),
    },
  });

  return (
    <SocketContext.Provider value={socket as Socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
