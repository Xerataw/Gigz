import { Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import MapTiler, {
  IAddressSearchItem,
} from '../../../services/MapTilerFetcher';
import { IStepProps } from '../../../types/IStepProps';
import TitleStep from './TitleStep';

const AddressCompleteStep: React.FC<IStepProps> = ({ form, label }) => {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchItems, setSearchItems] = useState<IAddressSearchItem[]>([]);
  const [debounced] = useDebouncedValue(form.values.address, 1000);

  useEffect(() => {
    if (searchValue !== undefined) {
      form.setFieldValue('address.value', searchValue);
      getAddressResult(searchValue);
    } else {
      setSearchValue(form.values.address.value);
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue !== undefined && searchValue.length > 0) {
      MapTiler.getAutocomplete(searchValue, setSearchItems);
    }
  }, [debounced]);

  const getAddressResult = (address: string) => {
    const addressItem = searchItems.find((item) => item.value === address);

    form.setFieldValue('address.longitude', addressItem?.longitude ?? 0);
    form.setFieldValue('address.latitude', addressItem?.latitude ?? 0);
    setSearchValue(address);
  };

  return (
    <>
      <TitleStep label={label} />

      <Autocomplete
        autoFocus
        label="Votre adresse"
        placeholder="15 rue des marronniers, 46330 Saint-Cirq-Lapopie"
        data={searchItems}
        {...form.getInputProps('address')}
        filter={() => true} //whitout this autocomplete take only items' value which start with search value
        onChange={getAddressResult}
        value={searchValue}
      />
    </>
  );
};

export default AddressCompleteStep;
