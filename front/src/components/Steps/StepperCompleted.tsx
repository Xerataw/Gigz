import { Center, RingProgress, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import EmailValidator from './Utils/EmailValidator';

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
  const [time, setTime] = useState<number>(0);
  const history = useHistory();

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
        <EmailValidator
          after={() => {
            if (needVerification) {
              setTimeout(() => {
                history.push(path);
              }, 200);
            }
          }}
        />
      )}
    </div>
  );
};

export default StepperCompleted;
