import { ActionIcon } from '@mantine/core';
import { MouseEventHandler } from 'react';

interface IEditButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const LightRoundButton: React.FC<IEditButtonProps> = ({
  children,
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
      {children}
    </ActionIcon>
  );
};

export default LightRoundButton;
