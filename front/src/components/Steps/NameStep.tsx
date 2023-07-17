import { TextInput } from '@mantine/core';
import { IStepProps } from '../../../types/IStepProps';
import StepTitle from './Utils/StepTitle';

const NameStep: React.FC<IStepProps> = ({ form, label }) => {
  return (
    <>
      <StepTitle label="Comment on peut vous appeler ?" />
      <TextInput
        autoFocus
        mt="sm"
        label="Nom"
        placeholder="Antarctic Lemur"
        {...form.getInputProps('name')}
      />
    </>
  );
};

export default NameStep;