import { Center } from '@mantine/core';
import React from 'react';

interface IStepperIconsProps {
  icons: React.JSX.Element[];
  currentStep: number;
}

const getClass = (currentStep: number, index: number): string => {
  if (index + 2 === currentStep || index - 2 === currentStep) {
    return 'w-8 h-8 text-slate-200';
  } else if (index + 1 === currentStep || index - 1 === currentStep) {
    return 'w-10 h-10 text-slate-500';
  } else if (index === currentStep) {
    return 'w-12 h-12 rounded-full border-solid border-3 border-[#FF7800]';
  }

  return 'hidden';
};

const StepperIcons: React.FC<IStepperIconsProps> = ({ icons, currentStep }) => {
  return (
    <div className="flex">
      {icons.map((icon, indexI) => (
        <Center key={indexI}>
          {React.cloneElement(icon, {
            className: 'p-1 ' + getClass(currentStep, indexI),
          })}
        </Center>
      ))}
    </div>
  );
};

export default StepperIcons;
