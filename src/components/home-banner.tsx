import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from './';

import { ROUTES } from '../utils/router';

import BG from '../assets/images/home-banner/bg.svg';

interface HomeBannerProps {}

export const HomeBanner: FC<HomeBannerProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10 bg-[#1a2759] pt-5 px-3 rounded-lg">
      <div className="flex justify-between gap-5">
        <div className="py-5">
          <h2 className="text-4xl mb-3">
            Be the first to know about
            <strong className="pl-2 text-red-500">crypto news daily</strong>
          </h2>
          <p className="text-xl mb-5">
            Don't miss out on the latest crypto insights, news, and updates! Stay informed and be in
            the know. Explore the world of cryptocurrencies and stay ahead of the curve. Read here
            to stay updated and never miss a beat.
          </p>
          <Button btnStyle="BLUE" onClick={() => navigate(ROUTES.NEWS)}>Go to news</Button>
        </div>
        <img src={BG} alt="Banner Background" height={100} />
      </div>
    </div>
  );
};