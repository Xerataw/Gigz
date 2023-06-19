import { ActionIcon } from '@mantine/core';
import React, { ReactElement, ReactNode } from 'react';
interface Props {
  size: 'small' | 'medium' | 'large';
  color: string;
  children: ReactNode;
  isFilled: boolean;
  fillColor: string;
}

const getSizePixel = (size: string): number => {
  switch (size) {
    case 'small':
      return 25;
    case 'medium':
      return 35;
    case 'large':
      return 45;
  }
  return 25;
};

const getSizeLabel = (size: string): string => {
  switch (size) {
    case 'small':
      return 'md';
    case 'medium':
      return 'lg';
    case 'large':
      return 'xl';
  }
  return 'md';
};

const Icon: React.FC<Props> = ({
  children,
  size,
  color,
  isFilled,
  fillColor,
}) => {
  const icon = React.cloneElement(children as ReactElement, {
    height: getSizePixel(size)?.toString(),
    width: getSizePixel(size)?.toString(),
  });

  return (
    <div className="m-2 flex">
      <ActionIcon
        size={getSizeLabel(size)}
        color={isFilled ? fillColor : color}
        variant={isFilled === true ? 'filled' : 'transparent'}
      >
        {icon}
      </ActionIcon>
    </div>
  );
};

export default Icon;
