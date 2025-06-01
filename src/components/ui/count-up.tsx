
import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export const CountUp = ({ end, duration = 2000, className = '', prefix = '', suffix = '' }: CountUpProps) => {
  const count = useCountUp({ end, duration });
  
  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};
