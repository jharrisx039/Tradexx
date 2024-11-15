import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  progress: number;
  className?: string;
  barClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  className,
  barClassName 
}) => {
  return (
    <div className={clsx('rounded-full overflow-hidden', className)}>
      <div
        className={clsx('h-full transition-all duration-300 ease-in-out', barClassName)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};