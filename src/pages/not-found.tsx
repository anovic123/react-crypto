import { FC } from 'react';

import IMG from '../assets/images/not-found/1.png';

interface NotFoundPageProps {}

export const NotFoundPage: FC<NotFoundPageProps> = ({}) => {
  return (
    <div className="flex items-center justify-center flex-col h-[80vh]">
      <div className="text-center mb-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-3xl mb-4">Page not found</p>
        <p className="text-2xl">Sorry, the requested page was not found.</p>
      </div>
      <img src={IMG} alt="not-found" height="200" width="200" />
    </div>
  );
};
