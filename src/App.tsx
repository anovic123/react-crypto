import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './layout';

import { DetailsPage } from './pages/details';
import { HomePage } from './pages/home';

import 'react-toastify/dist/ReactToastify.css';

import { ROUTES } from './utils/router';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DETAILS} element={<DetailsPage />} />
        </Route>
      </Routes>
      <div className="background-animation">
        <div id="ball-one"></div>
        <div id="ball-two"></div>
        <div id="ball-three"></div>
      </div>
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
