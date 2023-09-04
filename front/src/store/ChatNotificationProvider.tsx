import React, { ReactNode, createContext, useContext, useState } from 'react';

import { useSocket } from '../store/SocketProvider';

interface IChatNotificationProviderProps {
  children: ReactNode;
}

interface IChatNotificationContext {
  notificationCount: number;
  decreaseNotificationCount: (count: number) => void;
}

const ChatNotificationContext = createContext<IChatNotificationContext>(
  {} as IChatNotificationContext
);
export const useChatNotification = () => useContext(ChatNotificationContext);

const ChatNotificationProvider: React.FC<IChatNotificationProviderProps> = ({
  children,
}) => {
  const socket = useSocket();
  const [notificationCount, setNotificationCount] = useState(0);

  const decreaseNotificationCount = (count: number) => {
    if (notificationCount === 0) {
      return;
    }

    setNotificationCount((old) => Math.max(old - count, 0));
  };

  const listeners = socket.listeners('private-message');

  if (listeners.length === 0) {
    socket.on('private-message', () => {
      setNotificationCount((old) => {
        console.log('notificationCount:', old, ' =>', old + 1);
        return old + 1;
      });
    });
  }

  return (
    <ChatNotificationContext.Provider
      value={{
        notificationCount: notificationCount,
        decreaseNotificationCount: decreaseNotificationCount,
      }}
    >
      {children}
    </ChatNotificationContext.Provider>
  );
};

export default ChatNotificationProvider;
