import { SegmentedControl, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ICapacities, getCapacities } from '../../api/capacities';
import { IStepProps } from '../../types/IStepProps';
import StepTitle from './Utils/StepTitle';

const CapacityStep: React.FC<IStepProps> = ({ form, label }) => {
  const [capacities, setCapacities] = useState<ICapacities[]>([]);
  const [capacity, setCapacity] = useState<ICapacities>();

  const handleChangeCapacity = (
    id: string,
    capacitiesToSearchIn?: ICapacities[]
  ) => {
    const idNum = Number.parseInt(id);
    const _capacities = capacitiesToSearchIn ?? capacities;
    setCapacity(_capacities.find((cp) => cp.id === idNum));
  };

  /**
   * temporary array to get color
   */
  //                        50      100     250       500      25
  // const colors = ['', 'cyan', 'lime', 'yellow', 'orange', 'blue'];
  const colors = [
    '',
    'primary.3',
    'primary.4',
    'primary.5',
    'primary.6',
    'primary.2',
  ];

  useEffect(() => {
    getCapacities()
      .then((res) => res.data)
      .then((res) => res?.sort((a, b) => a.max - b.max))
      .then((res) => res?.map((cp) => ({ ...cp, color: colors[cp.id] })))
      .then((res) => setCapacities(res ?? []));
  }, []);

  useEffect(() => {
    if (capacity) {
      form.values.capacity = capacity.id.toString();
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
      <StepTitle label={label} />
      <Text m="sm" color="dimmed" align="center">
        Nombre de personne maxium que vous pouvez acceuillir dans votre
        établissement
      </Text>
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
