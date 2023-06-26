import { ActionIcon } from '@mantine/core';
import React, { ReactElement } from 'react';
import IconNavbar from '../../types/IconNavbar';

interface Props {
  size: 'small' | 'medium' | 'large';
  color: string;
  isFilled: boolean;
  icon: IconNavbar;
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

const Icon: React.FC<Props> = ({ size, color, isFilled, icon }) => {
  const sizePixel = getSizePixel(size)?.toString();

  const iconChild = React.cloneElement(icon.icon as ReactElement, {
    height: sizePixel,
    width: sizePixel,
  });

  const iconFilledChild = React.cloneElement(icon.iconFilled as ReactElement, {
    height: sizePixel,
    width: sizePixel,
  });

  return (
    <div className="m-2 flex">
      <ActionIcon
        size={getSizeLabel(size)}
        color={isFilled ? icon.fillColor : color}
        variant="transparent"
      >
        {isFilled ? iconFilledChild : iconChild}
      </ActionIcon>
    </div>
  );
};

export default Icon;
