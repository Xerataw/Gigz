import { Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import MapTiler, { IAddressSearchItem } from '../../services/MapTilerFetcher';
import { IStepProps } from '../../types/IStepProps';
import Helper from '../Tooltip/Helper';
import StepTitle from './Utils/StepTitle';

interface IAddressCompleteStepProps extends IStepProps {
  type: string;
}

const AddressCompleteStep: React.FC<IAddressCompleteStepProps> = ({
  form,
  type,
  translate,
}) => {
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
      MapTiler.getAutocomplete(type, searchValue, setSearchItems);
    }
  }, [debounced]);

  const getAddressResult = (address: string) => {
    //get address object from the one choosen by the user
    const addressItem = searchItems.find((item) => item.value === address);

    form.setFieldValue('address.longitude', addressItem?.longitude ?? 0);
    form.setFieldValue('address.latitude', addressItem?.latitude ?? 0);
    form.setFieldValue('address.city', addressItem?.city ?? 0);
    form.setFieldValue('address.code', addressItem?.code ?? 0);
    setSearchValue(address);
  };

  return (
    <>
      <StepTitle
        label={t(
          'register.addressCompleteStep.' + (translate ?? 'artist') + '.label'
        )}
      />

      <Autocomplete
        autoFocus
        label={
          <Helper.Label
            label={t(
              'register.addressCompleteStep.' +
                (translate ?? 'artist') +
                '.addressHelper'
            )}
          >
            {t(
              'register.addressCompleteStep.' +
                (translate ?? 'artist') +
                '.address'
            )}
          </Helper.Label>
        }
        dropdownPosition="bottom"
        placeholder={t(
          'register.addressCompleteStep.' +
            (translate ?? 'artist') +
            '.placeholder'
        )}
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
