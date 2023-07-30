import { ActionIcon, Tooltip } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { ReactNode, useEffect, useRef, useState } from 'react';

export interface IHelperProps {
  label: string;
  labelDirection?: 'left' | 'right';
}

const getLabelPosition = (position?: string) => {
  switch (position) {
    case 'right':
      return 'top-start';

    default:
      return 'top-end';
  }
};

interface IHelperLabelProps extends IHelperProps {
  children?: ReactNode | ReactNode[];
}

const Label: React.FC<IHelperLabelProps> = ({
  children,
  label,
  labelDirection,
}) => {
  const child = Array.isArray(children) ? children : [children];
  return (
    <span className="inline-flex align-bottom">
      <Helper label={label} labelDirection={labelDirection} />
      <div className="pt-[2px] pl-1">{child.map((children) => children)}</div>
    </span>
  );
};

interface HelperSubComponents {
  Label: React.FC<IHelperLabelProps>;
}

const Helper: React.FC<IHelperProps> & HelperSubComponents = ({
  label,
  labelDirection = 'top-end',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const timeoutID = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (open === true) {
      timeoutID.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    } else {
      clearTimeout(timeoutID.current);
    }
  }, [open]);

  return (
    <Tooltip
      label={label}
      opened={open}
      multiline
      position={getLabelPosition(labelDirection)}
    >
      <ActionIcon
        size="sm"
        radius="xl"
        variant="outline"
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

Helper.Label = Label;

export default Helper;
