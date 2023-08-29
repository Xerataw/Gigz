import { Center, Loader, RingProgress, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import { useUser } from '../../store/UserProvider';
import { t } from 'i18next';

interface IAccountCreatedProps {
  label: string;
  path: string;
}

const StepperCompleted: React.FC<IAccountCreatedProps> = ({ label, path }) => {
  const user = useUser();
  const [time, setTime] = useState<number>(0);
  const [isVerified, setVerified] = useState<boolean>(false);
  const history = useHistory();

  const profileType = user.getProfileType();

  useEffect(() => {
    if (time >= 100) {
      setTime(100);
    }
  }, [time]);

  useEffect(() => {
    if (isVerified === true) {
      setTimeout(() => {
        history.push(path);
      }, 200);
    }
  }, [isVerified]);

  useEffect(() => {
    /**
     * show a progress ring
     * for the user to understand he is waiting
     */
    setInterval(() => {
      setTime((old) => {
        if (old < 100) return old + Math.random() * 3;
        return old;
      });
    }, 50);

    /**
     * Wait for user validate it's email
     */
    setInterval(() => {
      if (profileType !== null) {
        getProfile(profileType).then((e) => {
          if (e.ok) {
            setVerified(true);
          }
        });
      }
    }, 2000);
  }, []);

  return (
    <div className="flex justify-center flex-col items-center mt-10">
      <Text size="lg" align="center">
        {label}
      </Text>
      <RingProgress
        sections={[{ value: time, color: 'primary' }]}
        className="mt-4"
        roundCaps
        label={
          <Center>
            {time === 100 ? (
              <ThemeIcon color="orange" variant="light" radius="xl" size="xl">
                <IconCheck size={22} />
              </ThemeIcon>
            ) : (
              <Text weight={700} align="center" size="xl">
                {time.toFixed(1)}%
              </Text>
            )}
          </Center>
        }
      />
      {time === 100 && (
        <div className="flex flex-col items-center mt-10">
          <Loader variant="bars" mb="md" />
          <Text size="lg" align="center">
            {t('register.verified')}
          </Text>
        </div>
      )}
    </div>
  );
};

export default StepperCompleted;
