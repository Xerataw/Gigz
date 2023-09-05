import { RangeSlider, Text } from '@mantine/core';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { getCapacities } from '../../../api/capacities';
import ICapacity from '../../../types/ICapacity';

interface ICapacityRange {
  form: any;
  disabled?: boolean;
  hidden: boolean;
}

const CapacityRange: React.FC<ICapacityRange> = ({
  form,
  disabled = false,
  hidden = false,
}) => {
  const [capacities, setCapacities] = useState([] as ICapacity[]);

  useEffect(() => {
    getCapacities().then((res) => {
      setCapacities(res?.data ?? []);
      form.values.capacities = [
        0,
        Math.max(...(res?.data?.map((c) => c.max) ?? [0])),
      ];
    });
  }, []);

  return (
    !hidden && (
      <div>
        <Text fz="md" c="dimmed">
          {t('search.capacity.label')}
        </Text>
        <RangeSlider
          disabled={disabled}
          step={1}
          marks={capacities.map((capacity) => ({
            value: capacity.max / 10,
            label: capacity.max,
          }))}
          label={(value) => t('search.capacity.amount', { count: value * 10 })}
          max={Math.max(...capacities.map((capacity) => capacity.max / 10))}
          className="mb-8"
          {...form.getInputProps('capacities')}
          minRange={1}
        />
      </div>
    )
  );
};

export default CapacityRange;
