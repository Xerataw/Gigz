import { Title } from '@mantine/core';

interface ITitleStepProps {
  label: string;
}

const StepTitle: React.FC<ITitleStepProps> = ({ label }) => {
  return (
    <Title order={2} align="center" mb="sm">
      {label}
    </Title>
  );
};

export default StepTitle;
