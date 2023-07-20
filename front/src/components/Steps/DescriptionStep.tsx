import { Textarea } from '@mantine/core';
import StepTitle from './Utils/StepTitle';
import { IStepProps } from '../../types/IStepProps';

const DescriptionStep: React.FC<IStepProps> = ({ form, label }) => {
  return (
    <>
      <StepTitle label={label} />
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
