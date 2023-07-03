import { Title, TextInput } from '@mantine/core';
import { StepProps } from '../AccountStep/FirstStep';

const FirstStepArtist: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <Title>Comment on peut vous appeler ?</Title>
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

export default FirstStepArtist;
