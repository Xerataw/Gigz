import React, { ReactElement, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode[];
}

const Form: React.FC<Props> = ({ children }) => {
  const [currentPart, setCurrentPart] = useState<number>(0);
  const values: Map<string, string | boolean> = new Map<
    string,
    string | boolean
  >();

  const updateValue = (key: string, value: string | boolean) => {
    values.set(key, value);
  };

  return (
    <div>
      {React.cloneElement(children[currentPart] as ReactElement, {
        values,
        updateValue,
        currentPart,
        updateCurrentPart: (part: number) => {
          setCurrentPart(part);
        },
      })}
    </div>
  );
};

export default Form;
