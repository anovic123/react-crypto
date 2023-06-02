import { FC, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { v1 } from 'uuid';
import { motion } from 'framer-motion';

import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '../../components';

import { headerLinks } from '../../common/mocks/navigate';

import { useMediaQuery } from '../../hooks/use-media-query';

import { ROUTES } from '../../utils/router';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  const path = window.location.pathname;

  const isMobile = useMediaQuery(728);

  const [activeLink, setActiveLink] = useState<string>(path);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="flex items-center justify-between py-5 px-1 relative z-10 mb-3">
      <Link
        to={ROUTES.HOME}
        className="font-semibold text-3xl hover:text-red-500 relative z-10"
        onClick={() => setActiveLink('/')}
      >
        React Crypto
      </Link>
      {isMobile ? (
        <div className="relative z-10">
          <Button btnStyle="PRIMARY" onClick={handleMenuToggle}>
            {isMenuOpen ? <AiOutlineClose size={35} /> : <RxHamburgerMenu size={35} />}
          </Button>
        </div>
      ) : (
        <ul className="flex gap-5 flex-wrap">
          {headerLinks.map((el) => (
            <li key={`headerLink-${v1()}`} onClick={() => setActiveLink(el.path)}>
              <NavLink
                to={el.path}
                className={`text-[1.33rem] ease-in duration-300 hover:text-red-500 hover:border-b-2 hover:border-red-500 ${
                  activeLink === el.path ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
                }`}
              >
                {el.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {isMobile && isMenuOpen && (
        <ul className="fixed inset-0 flex flex-col justify-center items-center bg-gray-800 pt-20">
          {headerLinks.map((el) => (
            <li key={`headerLink-${v1()}`} onClick={() => setActiveLink(el.path)}>
              <NavLink
                to={el.path}
                className={`block px-1 pt-2 pb-[0.1rem] text-[1.69rem] text-white ${
                  activeLink === el.path ? 'text-red-500 border-b-2 border-red-500' : 'text-white'
                }`}
                onClick={handleMenuToggle}
              >
                {el.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
