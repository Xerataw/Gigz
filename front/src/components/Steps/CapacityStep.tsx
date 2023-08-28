import { Center, SegmentedControl } from '@mantine/core';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { getCapacities } from '../../api/capacities';
import ICapacity from '../../types/ICapacity';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

const CapacityStep: React.FC<IStepProps> = ({ form }) => {
  const [capacities, setCapacities] = useState<ICapacity[]>([]);
  const [capacity, setCapacity] = useState<ICapacity>();

  const handleChangeCapacity = (
    id: string,
    capacitiesToSearchIn?: ICapacity[]
  ) => {
    const idNum = Number.parseInt(id);
    const _capacities = capacitiesToSearchIn ?? capacities;
    setCapacity(_capacities.find((cp) => cp.id === idNum));
  };

  const colors = [
    'primary.2',
    'primary.3',
    'primary.4',
    'primary.5',
    'primary.6',
  ];

  useEffect(() => {
    getCapacities()
      .then((res) => res.data)
      .then((res) => res?.sort((a, b) => a.max - b.max))
      .then((res) => res?.map((cp, index) => ({ ...cp, color: colors[index] })))
      .then((res) => setCapacities(res ?? []));
  }, []);

  useEffect(() => {
    if (capacity) {
      form.values.capacityId = capacity.id;
    }
  }, [capacity]);

  useEffect(() => {
    if (!capacity) {
      if (!form.values.capacity) setCapacity(capacities[0]);
      else handleChangeCapacity(form.values.capacity);
    }
  }, [capacities]);

  return (
    <>
      <StepTitle label={t('register.capacityStep.label')} />
      <Center>
        <Helper.UnderTitle label={t('register.capacityStep.helper')}>
          {t('register.capacityStep.capacity')}
        </Helper.UnderTitle>
      </Center>
      <SegmentedControl
        fullWidth
        color={capacity?.color ?? 'primary'} // only primary so don't need colors
        orientation="vertical"
        data={capacities.map((cp) => ({
          label: cp.max.toString() + ' personnes maximum',
          value: cp.id.toString(),
        }))}
        value={capacity?.id.toString()}
        onChange={handleChangeCapacity}
      />
    </>
  );
};

export default CapacityStep;
