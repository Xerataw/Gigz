import { Box, Center, SegmentedControl } from '@mantine/core';
import { IconBuilding, IconMusic } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EProfileType from '../../../types/EProfileType';

interface IProfileTypeProps {
  form: any;
  hidden?: boolean;
}

const ProfileType: React.FC<IProfileTypeProps> = ({ form, hidden = false }) => {
  const { t } = useTranslation();

  return (
    !hidden && (
      <SegmentedControl
        data={[
          {
            label: (
              <Center>
                <IconBuilding size="1rem" />
                <Box ml={10}>{t('search.host')}</Box>
              </Center>
            ),
            value: EProfileType.HOST,
          },
          {
            label: (
              <Center>
                <IconMusic size="1rem" />
                <Box ml={10}>{t('search.artist')}</Box>
              </Center>
            ),
            value: EProfileType.ARTIST,
          },
        ]}
        className="mt-4"
        {...form.getInputProps('type')}
      />
    )
  );
};

export default ProfileType;
