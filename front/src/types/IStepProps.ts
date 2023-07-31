import { UseFormReturnType } from '@mantine/form';

export interface IStepProps {
  form: UseFormReturnType<any>;
  label: string;
  nextStep?: () => void;
}
