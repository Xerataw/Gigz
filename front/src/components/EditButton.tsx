import { ActionIcon } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { MouseEventHandler } from 'react';

interface IEditButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const EditButton: React.FC<IEditButtonProps> = ({
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <ActionIcon
      variant="light"
      radius="xl"
      size="lg"
      className={className}
      pl={1}
      pb={1}
      onClick={onClick}
      disabled={disabled}
    >
      <IconPencil size="1.5rem" />
    </ActionIcon>
  );
};

export default EditButton;
