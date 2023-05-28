import { FC } from 'react';

interface SpinnerProps {}

export const Spinner: FC<SpinnerProps> = ({}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-20 h-20 relative animate-spin">
        <div className="w-full h-full border-4 border-solid border-gray-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-solid border-transparent border-t-[#2196f3] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
