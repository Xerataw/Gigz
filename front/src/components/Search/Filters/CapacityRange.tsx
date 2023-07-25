import { RangeSlider } from '@mantine/core';
import { ICapacities, getCapacities } from '../../../api/capacities';
import React, { useEffect, useState } from 'react';

const CapacityRange: React.FC = () => {
  const [capacities, setCapacities] = useState([] as ICapacities[]);

  useEffect(() => {
    getCapacities().then((res) => {
      setCapacities(res?.data ?? []);
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
      //{...form.getInputProps('capacityId')}
    />
  );
};

export default CapacityRange;
