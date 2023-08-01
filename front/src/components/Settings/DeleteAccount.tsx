import { ActionIcon, Button, Group } from '@mantine/core';
import {
  IconArrowBackUp,
  IconTrash,
  IconTrashXFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DeleteAccount: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const { t } = useTranslation();

  return (
    <>
      {step === 0 && (
        <Button
          leftIcon={<IconTrash />}
          onClick={() => setStep((old) => old + 1)}
        >
          {t('settings.deleteAccount.delete')}
        </Button>
      )}
      {step === 1 && (
        <Group>
          <ActionIcon
            onClick={() => {
              setStep((old) => old - 1);
            }}
          >
            <IconArrowBackUp />
          </ActionIcon>
          <Button leftIcon={<IconTrashXFilled />} color="secondary">
            {t('settings.deleteAccount.confirmation')}
          </Button>
        </Group>
      )}
    </>
  );
};

export default DeleteAccount;
