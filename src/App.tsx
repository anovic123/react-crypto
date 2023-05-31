import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './layout';

import { DetailsPage } from './pages/details';
import { HomePage } from './pages/home';
import { NewsPage } from './pages/news';
import { TrendingPage } from './pages/trending';

import { ROUTES } from './utils/router';

import 'react-toastify/dist/ReactToastify.css';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DETAILS} element={<DetailsPage />} />
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.TRENDING} element={<TrendingPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
};
