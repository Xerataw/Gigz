import { Box, Center, SegmentedControl } from '@mantine/core';
import getGenres from '../../../api/genres';
import React, { useEffect, useState } from 'react';
import IGenre from '../../../types/IGenre';
import { IconBuilding, IconMusic } from '@tabler/icons-react';
import EProfileType from '../../../types/EProfileType';
import { useTranslation } from 'react-i18next';

interface IProfileTypeProps {
  form: any;
}

const ProfileType: React.FC<IProfileTypeProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default ProfileType;
