import { SegmentedControl, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ICapacities, getCapacities } from '../../../api/capacities';
import { IStepProps } from '../AccountStep/FirstStep';

const CapacityStep: React.FC<IStepProps> = ({ form }) => {
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
  const colors = ['', 'teal', 'green', 'lime', 'yellow', 'cyan'];

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
      <Title mb="sm">Vous pouvez acceuillir combien de personne ?</Title>
      <Text m="sm" color="dimmed" align="center">
        Nombre de personne maxium que vous pouvez acceuillir dans votre
        établissement
      </Text>
      <SegmentedControl
        fullWidth
        color={capacity?.color ?? 'primary'}
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
