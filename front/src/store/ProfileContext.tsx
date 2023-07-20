import { createContext, useState } from 'react';

export interface IProfileContextContent {
  loading: boolean;
  editMode: boolean;
}

export const ProfileContext = createContext<IProfileContextContent>({
  loading: true,
  editMode: false,
});

const ProfileContextProvider = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
};

export default ProfileContextProvider;
