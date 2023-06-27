import { Button, Title, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { v4 } from 'uuid';

export interface StepProps {
  form: UseFormReturnType<any>;
  nextStep: () => void;
}

interface UserTypeButton {
  labelTooltip: string;
  label: string;
  value: 'isHost' | 'isArtist';
}

const userTypes: UserTypeButton[] = [
  {
    labelTooltip: 'Un artiste, un groupe',
    label: 'Un artiste',
    value: 'isArtist',
  },
  {
    labelTooltip: 'Une salle, un bar, un resto',
    label: 'Un host',
    value: 'isHost',
  },
];

const FirstStep: React.FC<StepProps> = ({ form, nextStep }) => {
  return (
    <>
      <Title>Vous êtes </Title>
      <Button.Group orientation="vertical">
        {userTypes.map((item) => (
          <Tooltip
            key={v4()}
            label={item.labelTooltip}
            withinPortal
            onClick={() => {
              form.setValues((values) => ({
                ...values,
                userType: item.value,
              }));
              nextStep();
            }}
          >
            <Button
              size="xl"
              m="lg"
              variant={
                form.values.userType === item.value ? 'filled' : 'outline'
              }
            >
              {item.label}
            </Button>
          </Tooltip>
        ))}
      </Button.Group>
    </>
  );
};

export default FirstStep;
