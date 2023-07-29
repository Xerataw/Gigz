import { ActionIcon, Tooltip } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { useState } from 'react';

interface ITooltipMenuProps {
  label: string;
}

const TooltipMenu: React.FC<ITooltipMenuProps> = ({ label }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Tooltip label={label} opened={open} multiline position="top-end">
      <ActionIcon
        size="sm"
        radius="xl"
        variant="light"
        onClick={(e) => {
          e.stopPropagation();

          setOpen((o) => !o);
        }}
      >
        <IconQuestionMark size="1.625rem" />
      </ActionIcon>
    </Tooltip>
  );
};

export default TooltipMenu;
