import { UseFormReturnType } from '@mantine/form';

export interface IStepProps {
  form: UseFormReturnType<any>;
  nextStep?: () => void;
}
