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
  editedName: {
    editedName: string;
    setEditedName: (editedName: string) => void;
  };
}

const ProfileEditContext = createContext<IProfileEditContext>(
  {} as IProfileEditContext
);

export const useProfileEditMode = () => useContext(ProfileEditContext);

interface IProfileEditProviderProps {
  children: React.ReactNode;
}

const ProfileEditProvider: React.FC<IProfileEditProviderProps> = ({
  children,
}) => {
  // Edit mode management
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editConfirmed, setEditConfirmed] = useState<boolean>(false);

  // Values to edit
  const [editedName, setEditedName] = useState<string>('');

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
        editedName: {
          editedName,
          setEditedName,
        },
      }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
};

export default ProfileEditProvider;
