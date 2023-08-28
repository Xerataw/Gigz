import { Autocomplete, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import MapTiler, {
  IAddressSearchItem,
} from '../../../services/MapTilerFetcher';

interface ILocationSelectorProps {
  form: UseFormReturnType<any>;
}

const LocationSelector: React.FC<ILocationSelectorProps> = ({ form }) => {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchItems, setSearchItems] = useState<IAddressSearchItem[]>([]);
  const [debounced] = useDebouncedValue(searchValue, 1000);

  useEffect(() => {
    if (searchValue !== undefined) {
      getAddressResult(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue !== undefined && searchValue.length > 0) {
      MapTiler.getAutocomplete('municipality', searchValue, setSearchItems);
    }
  }, [debounced]);

  const getAddressResult = (address: string) => {
    //get address object from the one choosen by the user
    const addressItem = searchItems.find((item) => item.value === address);
    form.setFieldValue('location', {
      latitude: addressItem?.latitude ?? 0,
      longitude: addressItem?.longitude ?? 0,
    });
    setSearchValue(address);
  };

  return (
    <Autocomplete
      label={<Text c="dimmed">{t('search.location')}</Text>}
      dropdownPosition="bottom"
      placeholder="Bordeaux"
      data={searchItems}
      filter={() => true} //whitout this autocomplete take only items' value which start with search value
      {...form.getInputProps('location')}
      onChange={getAddressResult}
      value={searchValue}
    />
  );
};

export default LocationSelector;
