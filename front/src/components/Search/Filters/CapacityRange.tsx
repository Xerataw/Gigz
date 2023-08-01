import { RangeSlider, Text } from '@mantine/core';
import { getCapacities } from '../../../api/capacities';
import React, { useEffect, useState } from 'react';
import ICapacity from '../../../types/ICapacity';
import { t } from 'i18next';
import { IconUser, IconUsersGroup } from '@tabler/icons-react';

interface ICapacityRange {
  form: any;
  disabled?: boolean;
}

const CapacityRange: React.FC<ICapacityRange> = ({
  form,
  disabled = false,
}) => {
  const [capacities, setCapacities] = useState([] as ICapacity[]);

  useEffect(() => {
    console.log(disabled);
  }, []);

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
    <>
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
    </>
  );
};

export default CapacityRange;
