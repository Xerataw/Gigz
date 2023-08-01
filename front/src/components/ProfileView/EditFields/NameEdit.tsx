import { TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useProfileEdit } from '../../../store/ProfileEditProvider';

interface IBannerEditNameProps {
  name: string;
}

const NameEdit: React.FC<IBannerEditNameProps> = ({ name }) => {
  const { editMode, setEditedName } = useProfileEdit();
  const [currentName, setCurrentName] = useState<string>(name);

  function updateName(updatedName: string) {
    setCurrentName(updatedName);
    setEditedName(updatedName);
  }

  // Reset name if canceled before
  useEffect(() => {
    setCurrentName(name);
  }, [editMode]);

  return (
    <TextInput
      value={currentName}
      variant="unstyled"
      onChange={(event) => updateName(event.target.value)}
      h="1.8rem"
      styles={{
        input: {
          fontWeight: 600,
          fontSize: '1.15rem',
          padding: 0,
          paddingLeft: 5,
          margin: 0,
          height: '1rem',
          width: '72%',
          backgroundColor: 'rgb(241, 243, 245)',
          borderRadius: '5px',
        },
      }}
    />
  );
};

export default NameEdit;
