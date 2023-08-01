import { RangeSlider } from '@mantine/core';
import { getCapacities } from '../../../api/capacities';
import React, { useEffect, useState } from 'react';
import ICapacity from '../../../types/ICapacity';

interface ICapacityRange {
  form: any;
}

const CapacityRange: React.FC<ICapacityRange> = ({ form }) => {
  const [capacities, setCapacities] = useState([] as ICapacity[]);

  useEffect(() => {
    getCapacities().then((res) => {
      setCapacities(res?.data ?? []);
      form.values.capacity = [
        0,
        Math.max(...(res?.data?.map((c) => c.max) ?? [0])),
      ];
    });
  }, []);

  return (
    <RangeSlider
      step={1}
      marks={capacities.map((capacity) => ({
        value: capacity.max / 10,
        label: capacity.max,
      }))}
      label={(value) => `${value * 10} people`}
      max={Math.max(...capacities.map((capacity) => capacity.max / 10))}
      className="mb-8"
      {...form.getInputProps('capacity')}
    />
  );
};

export default CapacityRange;
