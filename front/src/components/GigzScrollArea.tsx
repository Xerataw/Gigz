import { ScrollArea } from '@mantine/core';
import { useRef } from 'react';

interface IGigzScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  isLastPage: boolean;
  onBottomReached?: () => void;
}

const GigzScrollArea: React.FC<IGigzScrollAreaProps> = ({
  children,
  className,
  isLastPage,
  onBottomReached,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = (position: { x: number; y: number }) => {
    if (
      !isLastPage &&
      onBottomReached &&
      (ref.current?.clientHeight ?? 0) + position.y >=
        (ref.current?.scrollHeight ?? 0)
    ) {
      onBottomReached();
    }
  };

  return (
    <ScrollArea
      className={className}
      onScrollPositionChange={onScroll}
      viewportRef={ref}
    >
      {children}
    </ScrollArea>
  );
};

export default GigzScrollArea;
