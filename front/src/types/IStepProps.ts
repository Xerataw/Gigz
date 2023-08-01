import { UseFormReturnType } from '@mantine/form';

export interface IStepProps {
  form: UseFormReturnType<any>;
  translate?: 'artist' | 'host';
  nextStep?: () => void;
}
