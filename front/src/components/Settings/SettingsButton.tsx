import { ActionIcon, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

interface ISettingsButtonProps {
  label: string;
}

const SettingsButton: React.FC<ISettingsButtonProps> = ({ label }) => {
  return (
    <>
      <div className="w-full relative h-10 rounded p-2">
        <Text>{label}</Text>
        <div className="absolute w-full h-full top-0 flex items-center justify-end p-2 px-4">
          <ActionIcon size="md" radius="lg" variant="outline">
            <IconChevronRight size="1rem" />
          </ActionIcon>
        </div>
      </div>
    </>
  );
};

export default SettingsButton;
