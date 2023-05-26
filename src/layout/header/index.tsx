import { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { v1 } from 'uuid';
import { headerLinks } from '../../common/mocks/navigate';

import { ROUTES } from '../../utils/router';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const path = window.location.pathname;

  const [activeLink, setActiveLink] = useState<string>(path);

  return (
    <header className="flex gap-5 justify-between py-5">
      <Link to={ROUTES.HOME} className="font-semibold text-2xl">
        React Crypto
      </Link>
      <ul className="flex gap-5 flex-wrap">
        {headerLinks.map((el) => (
          <li key={`headerLink-${v1()}`} onClick={() => setActiveLink(el.path)}>
            <NavLink
              to={el.path}
              className={`text-lg ${
                activeLink === el.path ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
              }`}
            >
              {el.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};
