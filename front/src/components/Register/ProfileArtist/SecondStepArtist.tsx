import { Textarea, Title } from '@mantine/core';
import { StepProps } from '../AccountStep/FirstStep';

const SecondStepArtist: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <Title>Qui êtes vous ?</Title>
      <Textarea
        autoFocus
        placeholder="Les membres du groupe 'Antarctic Lemur' fusionnent leur passion pour le rock alternatif et l'électro-pop pour créer une expérience musicale unique. 'Antarctic Lemur' offre une atmosphère envoûtante où se mêlent énergie et sensibilité."
        label="Description"
        autosize
        minRows={4}
        {...form.getInputProps('description')}
      />
    </>
  );
};

export default SecondStepArtist;
