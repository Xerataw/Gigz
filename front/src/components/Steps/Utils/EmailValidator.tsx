import { Text } from '@mantine/core';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { getProfile } from '../../../api/user';
import { useUser } from '../../../store/UserProvider';

interface IEmailValidatorProps {
  after: () => void;
}

const EmailValidator: React.FC<IEmailValidatorProps> = ({ after }) => {
  const [verified, setVerified] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();

  const user = useUser();
  const profileType = user.getProfileType();

  useEffect(() => {
    if (verified) {
      clearInterval(intervalID);
      after();
    }
  }, [verified]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (profileType !== null) {
        getProfile(profileType).then((e) => {
          if (e.ok) {
            setVerified(true);
          }
        });
      }
    }, 2000);
    setIntervalID(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-10">
      <Text size="lg" align="center">
        {t('register.verified')}
      </Text>
    </div>
  );
};

export default EmailValidator;
