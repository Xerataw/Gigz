import { ActionIcon, Center, useMantineColorScheme } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconArrowRightBar } from '@tabler/icons-react';
import React from 'react';
import { useHistory } from 'react-router';

interface IStepperIconsProps {
  icons: React.JSX.Element[];
  currentStep: number;
  form: UseFormReturnType<any>;
  hasSkip?: boolean;
}

const getClass = (
  currentStep: number,
  index: number,
  isDark: boolean
): string => {
  if (index + 2 === currentStep || index - 2 === currentStep) {
    return 'w-8 h-8 ' + (isDark ? 'text-slate-500 ' : 'text-slate-200 ');
  } else if (index + 1 === currentStep || index - 1 === currentStep) {
    return 'w-10 h-10 ' + (isDark ? 'text-slate-400 ' : 'text-slate-500 ');
  } else if (index === currentStep) {
    return 'w-12 h-12 rounded-full border-solid border-3 border-[#FF7800]';
  }

  return 'hidden';
};

const StepperIcons: React.FC<IStepperIconsProps> = ({
  icons,
  currentStep,
  form,
  hasSkip = true,
}) => {
  const history = useHistory();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <div className="flex relative w-full justify-center">
      {currentStep < 5 && hasSkip && (
        <div className="absolute right-0 right-[-20px] h-full flex items-center">
          <ActionIcon
            color="primary"
            radius="xl"
            size="lg"
            variant="filled"
            onClick={() => {
              if (form.validate().hasErrors === false) {
                history.push('/auth/profile');
              }
            }}
          >
            <IconArrowRightBar />
          </ActionIcon>
        </div>
      )}
      {icons.map((icon, indexI) => (
        <Center key={indexI}>
          {React.cloneElement(icon, {
            className: 'p-1 ' + getClass(currentStep, indexI, isDark),
          })}
        </Center>
      ))}
    </div>
  );
};

export default StepperIcons;
