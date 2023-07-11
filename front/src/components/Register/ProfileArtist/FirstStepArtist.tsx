import { Title, TextInput } from '@mantine/core';
import { IStepProps } from '../AccountStep/FirstStep';

const FirstStepArtist: React.FC<IStepProps> = ({ form }) => {
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
