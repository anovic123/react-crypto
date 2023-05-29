import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui-kit/button';

import { ROUTES } from '../utils/router';

interface ErrorProps {
  message: any;
}

export const Error: FC<ErrorProps> = ({ message = 'An error occurred' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[50%]">
      <div className="max-w-md px-4 py-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-500">Error</h2>
        <p className="text-red-500 mb-4">{message}</p>
        <Button btnStyle="RED" onClick={() => navigate(ROUTES.HOME)}>Back</Button>
      </div>
    </div>
  );
};