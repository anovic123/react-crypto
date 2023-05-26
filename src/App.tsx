import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Layout } from './layout';

import { HomePage } from './pages/home';

import { ROUTES } from './utils/router';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
