import { useEffect, useState } from 'react';
import { Text, TextInput } from '@mantine/core';
import { useProfileEdit } from '../../../store/ProfileEditProvider';

interface IBannerNameProps {
  name: string;
}

const BannerName: React.FC<IBannerNameProps> = ({ name }) => {
  const { editMode, editedName } = useProfileEdit();
  const [currentName, setCurrentName] = useState<string>(name);

  function updateName(updatedName: string) {
    setCurrentName(updatedName);
    editedName.setEditedName(updatedName);
  }

  // Reset name if canceled before
  useEffect(() => {
    setCurrentName(name);
  }, [editMode.editMode]);

  return editMode.editMode ? (
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
  ) : (
    <Text
      truncate
      className="font-bold text-xl pr-2 h-[1.8rem] w-5/6 text-ellipsis"
    >
      {name}
    </Text>
  );
};

export default BannerName;
