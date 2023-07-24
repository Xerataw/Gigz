import { createContext, useContext, useState } from 'react';

interface IProfileContext {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const ProfileContext = createContext<IProfileContext>({
  editMode: false,
  setEditMode: () => undefined,
});

export const useProfileEditMode = () => useContext(ProfileContext);

interface IProfileEditModeProviderProps {
  children: React.ReactNode;
}

const ProfileEditModeProvider: React.FC<IProfileEditModeProviderProps> = ({
  children,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <ProfileContext.Provider
      value={{
        editMode,
        setEditMode,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileEditModeProvider;
