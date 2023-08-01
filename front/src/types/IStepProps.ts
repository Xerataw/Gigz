import { UseFormReturnType } from '@mantine/form';

export interface IStepProps {
  form: UseFormReturnType<any>;
  type?: 'artist' | 'host';
  nextStep?: () => void;
}
