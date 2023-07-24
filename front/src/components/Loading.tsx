import { Center, Loader } from '@mantine/core';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <Center className="h-screen">
      <Loader />
    </Center>
  );
};

export default Loading;
