import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/router';

interface FooterProps {}

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            to={ROUTES.HOME}
            className="text-2xl text hover:text-red-500 font-bold mb-4 md:mb-0"
          >
            React Crypto
          </Link>
          <div className="text text-lg">
            Developed by{' '}
            <a
              href="https://github.com/anovic123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:underline"
            >
              anovic
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
