import { Chip } from '@mantine/core';
import ICapacity from '../../../types/ICapacity';

interface IAddCapacictiesListProps {
  capacities: ICapacity[];
  onCapacitySelected: (newCapacity: ICapacity) => void;
}

const AddCapacitiesList: React.FC<IAddCapacictiesListProps> = ({
  capacities,
  onCapacitySelected,
}) => {
  return (
    <ul className="w-[12rem] flex flex-row flex-wrap">
      {capacities.map((capacity) => (
        <li key={capacity.id} className="my-[0.2rem] mr-[0.2rem]">
          <Chip
            defaultChecked={false}
            onChange={() => onCapacitySelected(capacity)}
            color={capacity.bgColor}
          >
            {capacity.max}
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default AddCapacitiesList;
