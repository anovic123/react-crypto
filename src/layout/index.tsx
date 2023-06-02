import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
  return (
    <div className="flex h-[100vh] flex-col max-w-7xl m-auto">
      <Header />
      <main className="grow">
          <Outlet />
      </main>
      <Footer />
      <div className="background-animation">
        <div id="ball-one"></div>
        <div id="ball-two"></div>
        <div id="ball-three"></div>
      </div>
    </div>
  );
};
