import { createContext, useContext, useEffect, useState } from 'react';

interface IProfileEditContext {
  editMode: {
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
  };
  editConfirmed: {
    editConfirmed: boolean;
    setEditConfirmed: (editConfirmed: boolean) => void;
  };
}

const ProfileEditContext = createContext<IProfileEditContext>({
  editMode: {
    editMode: false,
    setEditMode: () => undefined,
  },
  editConfirmed: {
    editConfirmed: false,
    setEditConfirmed: () => undefined,
  },
});

export const useProfileEditMode = () => useContext(ProfileEditContext);

interface IProfileEditProviderProps {
  children: React.ReactNode;
}

const ProfileEditProvider: React.FC<IProfileEditProviderProps> = ({
  children,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editConfirmed, setEditConfirmed] = useState<boolean>(false);

  // TODO: Send patch request to backend
  useEffect(() => {
    if (editConfirmed) {
      console.log('PATCH Profile');
    }
  }, [editConfirmed]);

  return (
    <ProfileEditContext.Provider
      value={{
        editMode: {
          editMode,
          setEditMode,
        },
        editConfirmed: {
          editConfirmed,
          setEditConfirmed,
        },
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
