import { ActionIcon, Group } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

interface IStepButtonsProps {
  numberOfSteps: number;
  formStep: number;
  nextDisabled?: boolean;
  prevStep: () => void;
  nextStep: () => void;
}

const StepButtons: React.FC<IStepButtonsProps> = ({
  numberOfSteps,
  formStep,
  prevStep,
  nextStep,
  nextDisabled,
}) => {
  return (
    <Group position="right" mt="xl">
      {formStep > 0 && formStep < numberOfSteps && (
        <ActionIcon variant="default" onClick={prevStep} size="lg">
          <IconArrowLeft />
        </ActionIcon>
      )}
      {formStep < numberOfSteps && (
        <ActionIcon
          disabled={nextDisabled}
          variant="filled"
          color="primary"
          onClick={nextStep}
          size="xl"
        >
          <IconArrowRight />
        </ActionIcon>
      )}
    </Group>
  );
};

export default StepButtons;
