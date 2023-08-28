import { ActionIcon, Text, Tooltip } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import { ReactNode } from 'react';

export interface IHelperProps {
  label: string | ReactNode;
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

const UnderTitle: React.FC<IHelperLabelProps> = ({
  children,
  label,
  labelDirection,
}) => {
  const child = Array.isArray(children) ? children : [children];

  return (
    <div className="flex justify-center pb-2">
      <Text c="dimmed">
        <Helper.Label label={label} labelDirection={labelDirection}>
          {child}
        </Helper.Label>
      </Text>
    </div>
  );
};

interface HelperSubComponents {
  Label: React.FC<IHelperLabelProps>;
  UnderTitle: React.FC<IHelperLabelProps>;
}

const Helper: React.FC<IHelperProps> & HelperSubComponents = ({
  label,
  labelDirection = 'top-end',
}) => {
  return (
    <Tooltip
      label={label}
      events={{ hover: true, focus: false, touch: true }}
      multiline
      position={getLabelPosition(labelDirection)}
    >
      <ActionIcon size="sm" radius="xl" variant="outline">
        <IconQuestionMark size="1.625rem" />
      </ActionIcon>
    </Tooltip>
  );
};

Helper.Label = Label;
Helper.UnderTitle = UnderTitle;

export default Helper;
