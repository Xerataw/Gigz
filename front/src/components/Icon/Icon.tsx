import React, { ReactElement, ReactNode } from 'react';
interface Props {
  size: 'small' | 'medium' | 'large';
  color: string;
  children: ReactNode;
}

const getSize = (size: string) => {
  switch (size) {
    case 'small':
      return 25;
    case 'medium':
      return 35;
    case 'large':
      return 45;
  }
};

const Icon: React.FC<Props> = ({ children, size, color }) => {
  const icon = React.cloneElement(children as ReactElement, {
    height: getSize(size)?.toString(),
    width: getSize(size)?.toString(),
    color,
  });

  return <div className="m-2 flex">{icon}</div>;
};

export default Icon;
