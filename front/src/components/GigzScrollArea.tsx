import { ScrollArea } from '@mantine/core';
import { useEffect, useRef } from 'react';

interface IGigzScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  isLastPage: boolean;
  type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never' | undefined;
  inverted?: boolean;
  onBottomReached?: () => void;
}

const GigzScrollArea: React.FC<IGigzScrollAreaProps> = ({
  children,
  className,
  isLastPage,
  type,
  inverted = false,
  onBottomReached,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inverted) {
      ref.current?.scrollTo(0, ref.current?.scrollHeight);
    }
  });

  const onScroll = (position: { x: number; y: number }) => {
    if (!isLastPage && onBottomReached && isBottomReached(position)) {
      onBottomReached();
    }
  };

  const isBottomReached = (position: { x: number; y: number }) => {
    if (inverted) {
      return position.y <= 0;
    }

    return (
      (ref.current?.clientHeight ?? 0) + position.y >=
      (ref.current?.scrollHeight ?? 0)
    );
  };

  return (
    <ScrollArea
      className={className}
      onScrollPositionChange={onScroll}
      viewportRef={ref}
      type={type}
    >
      {children}
    </ScrollArea>
  );
};

export default GigzScrollArea;
