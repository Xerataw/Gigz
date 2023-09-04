import { Center, Loader, RingProgress, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getProfile } from '../../api/user';
import { useUser } from '../../store/UserProvider';

interface IAccountCreatedProps {
  label: string;
  path: string;
  needVerification?: boolean;
}

const StepperCompleted: React.FC<IAccountCreatedProps> = ({
  label,
  path,
  needVerification = false,
}) => {
  const user = useUser();
  const [time, setTime] = useState<number>(0);
  const [isVerified, setVerified] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
  const history = useHistory();

  const profileType = user.getProfileType();

  useEffect(() => {
    if (time >= 100) {
      setTime(100);
      if (!needVerification)
        setTimeout(() => {
          history.push(path);
        }, 200);
    }
  }, [time]);

  useEffect(() => {
    if (needVerification && isVerified) {
      clearInterval(intervalID);
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
