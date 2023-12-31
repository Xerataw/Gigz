import React, { ReactNode, createContext, useContext, useState } from 'react';

import { useSocket } from '../store/SocketProvider';
import type IMessage from '../types/chat/IMessage';
import { useUser } from './UserProvider';

interface IChatNotificationProviderProps {
  children: ReactNode;
}

interface IPrivateMessageEvent {
  message: IMessage;
  recipientUuid: string;
}

interface IChatNotificationContext {
  notificationCount: number;
  decreaseNotificationCount: (count: number) => void;
  setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
}

const ChatNotificationContext = createContext<IChatNotificationContext>(
  {} as IChatNotificationContext
);
export const useChatNotification = () => useContext(ChatNotificationContext);

const ChatNotificationProvider: React.FC<IChatNotificationProviderProps> = ({
  children,
}) => {
  const socket = useSocket();
  const user = useUser();
  const [notificationCount, setNotificationCount] = useState(0);

  const decreaseNotificationCount = (count: number) => {
    if (notificationCount === 0) {
      return;
    }

    setNotificationCount((old) => Math.max(old - count, 0));
  };

  const listeners = socket.listeners('private-message');

  if (listeners.length === 0) {
    socket.on('private-message', ({ recipientUuid }: IPrivateMessageEvent) => {
      const uuid = user.getUserId();

      // Only send notification if we are the recipient
      if (uuid && uuid === recipientUuid) {
        setNotificationCount((old) => old + 1);
      }
    });
  }

  return (
    <ChatNotificationContext.Provider
      value={{
        notificationCount: notificationCount,
        setNotificationCount: setNotificationCount,
        decreaseNotificationCount: decreaseNotificationCount,
      }}
    >
      {children}
    </ChatNotificationContext.Provider>
  );
};

export default ChatNotificationProvider;
