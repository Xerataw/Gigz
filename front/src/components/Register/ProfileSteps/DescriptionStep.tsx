import { Textarea, Title } from '@mantine/core';
import { IStepProps } from '../AccountStep/FirstStep';

const DescriptionStep: React.FC<IStepProps> = ({ form }) => {
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

export default DescriptionStep;
