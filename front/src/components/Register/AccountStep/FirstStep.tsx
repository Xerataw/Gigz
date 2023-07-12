import { Button, Title, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

export interface IStepProps {
  form: UseFormReturnType<any>;
  nextStep: () => void;
}

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

const FirstStep: React.FC<IStepProps> = ({ form, nextStep }) => {
  return (
    <>
      <Title>Vous êtes </Title>
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
              nextStep();
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

export default FirstStep;
