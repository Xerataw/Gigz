import { Button, Group } from '@mantine/core';
import React, { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode[];
}

const Form: React.FC<Props> = ({ children }) => {
  const [currentPart, setCurrentPart] = useState<number>(0);

  return (
    <div>
      {children[currentPart]}
      <Group>
        <Button
          disabled={currentPart <= 0}
          onClick={() => {
            if (currentPart > 0) setCurrentPart((old) => old - 1);
          }}
        >
          Prev Part
        </Button>
        <Button
          disabled={currentPart >= children.length - 1}
          onClick={() => {
            if (currentPart < children.length - 1)
              setCurrentPart((old) => old + 1);
          }}
        >
          Next Part
        </Button>
      </Group>
    </div>
  );
};

export default Form;
