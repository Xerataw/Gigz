import { Button, Tooltip } from '@mantine/core';
import { IStepProps } from '../../types/IStepProps';
import StepTitle from './Utils/StepTitle';

interface IUserTypeButton {
  labelTooltip: string;
  label: string;
  value: 'host' | 'artist';
}

const userTypes: IUserTypeButton[] = [
  {
    labelTooltip: 'Un artiste, un groupe',
    label: 'Un artiste',
    value: 'artist',
  },
  {
    labelTooltip: 'Une salle, un bar, un resto',
    label: 'Un host',
    value: 'host',
  },
];

const ProfileTypeStep: React.FC<IStepProps> = ({ form, label, nextStep }) => {
  return (
    <>
      <StepTitle label={label} />
      <Button.Group orientation="vertical">
        {userTypes.map((userType) => (
          <Tooltip
            key={userType.value}
            label={userType.labelTooltip}
            withinPortal
            onClick={() => {
              form.setValues((values) => ({
                ...values,
                userType: userType.value,
              }));
              if (nextStep) nextStep();
            }}
          >
            <Button
              size="xl"
              m="lg"
              variant={
                form.values.userType === userType.value ? 'filled' : 'outline'
              }
            >
              {userType.label}
            </Button>
          </Tooltip>
        ))}
      </Button.Group>
    </>
  );
};

export default ProfileTypeStep;
