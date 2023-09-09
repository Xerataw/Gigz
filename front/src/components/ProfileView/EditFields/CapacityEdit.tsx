import { useEffect, useState } from 'react';
import ICapacity from '../../../types/ICapacity';
import { useProfileEdit } from '../../../store/ProfileEditProvider';
import { getCapacities } from '../../../api/capacities';
import { IconSeparator, IconUsersGroup } from '@tabler/icons-react';
import { Badge, Popover, Skeleton } from '@mantine/core';
import AddCapacitiesList from './AddCapacitiesList';

interface ICapacityEditProps {
  defaultCapacity: ICapacity;
}

const CapacityEdit: React.FC<ICapacityEditProps> = ({ defaultCapacity }) => {
  const { setEditedCapacity } = useProfileEdit();
  const [loading, setLoading] = useState<boolean>(true);
  const [allCapacities, setAllCapacities] = useState<ICapacity[]>([]);
  const [currentCapacity, setCurrentCapacity] = useState(defaultCapacity);
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);

  const onCapacitySelected = (newCapacity: ICapacity) => {
    setPopoverOpened(false);
    setCurrentCapacity(newCapacity);
    setEditedCapacity(newCapacity);
  };

  useEffect(() => {
    getCapacities().then((res) => {
      setAllCapacities(res.data as ICapacity[]);
      setLoading(false);
    });
  }, []);

  return (
    <Popover
      opened={popoverOpened}
      onClose={() => setPopoverOpened(false)}
      closeOnEscape={false}
    >
      <Popover.Target>
        <Skeleton visible={loading} className="flex flex-row items-center mb-1">
          <IconSeparator className="ml-[0.3rem] mr-[0.4rem]" />
          <Badge
            variant="filled"
            bg={currentCapacity.bgColor}
            px={8}
            rightSection={
              <IconUsersGroup size="1rem" className="mt-[0.3rem]" />
            }
            onClick={() => setPopoverOpened(true)}
          >
            {currentCapacity.max}
          </Badge>
        </Skeleton>
      </Popover.Target>
      <Popover.Dropdown>
        {!loading && (
          <AddCapacitiesList
            capacities={allCapacities.filter(
              (capacity) => capacity.id !== currentCapacity.id
            )}
            onCapacitySelected={onCapacitySelected}
          />
        )}
      </Popover.Dropdown>
    </Popover>
  );
};

export default CapacityEdit;
