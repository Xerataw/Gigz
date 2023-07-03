import { Center, RingProgress, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

interface Props {
  userType: 'artist' | 'host';
}

const CompleteAccount: React.FC<Props> = ({ userType }) => {
  const [time, setTime] = useState<number>(0);
  const history = useHistory();

  const artistPath = '/login/register/artist';
  const hostPath = '/login/register/host';

  useEffect(() => {
    if (time >= 100) {
      setTime(100);

      setTimeout(() => {
        history.push(userType === 'artist' ? artistPath : hostPath);
      }, 200);
    }
  }, [time]);

  useEffect(() => {
    setInterval(() => {
      setTime((old) => {
        if (old < 100) return old + Math.random() * 3;
        return old;
      });
    }, 50);
  }, []);

  return (
    <div className="flex justify-center flex-col items-center mt-10">
      <Text size="lg" align="center">
        Votre compte est en cours de création
      </Text>
      <RingProgress
        sections={[{ value: time, color: 'secondary' }]}
        className="mt-4"
        roundCaps
        label={
          <Center>
            {time === 100 ? (
              <ThemeIcon color="orange" variant="light" radius="xl" size="xl">
                <IconCheck size={22} />
              </ThemeIcon>
            ) : (
              <Text color="black" weight={700} align="center" size="xl">
                {time.toFixed(1)}%
              </Text>
            )}
          </Center>
        }
      />
    </div>
  );
};

export default CompleteAccount;
