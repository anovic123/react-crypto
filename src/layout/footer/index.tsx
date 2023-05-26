import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/router';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="flex gap-1 justify-between py-5 font-medium text-lg">
      <Link to={ROUTES.HOME} className="text-xl hover:text-red-500">
        React Crypto
      </Link>
      <div>
        Developed by{' '}
        <a
          href="https://github.com/anovic123"
          target="_blank"
          className="text-red-500 font-bold text-xl hover:underline"
        >
          anovic
        </a>
      </div>
    </footer>
  );
};
