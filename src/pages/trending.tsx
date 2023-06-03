import { FC } from 'react';

import { Spinner, TrendingCard } from '../components';

import { useGetTrendingDataQuery } from '../api/coinApi';

interface TrendingPageProps {}

export const TrendingPage: FC<TrendingPageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTrendingDataQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data?.coins || data.coins.length === 0) {
    return <div>No trending coins found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data?.coins.map((el) => (
        <TrendingCard key={el.item.id} {...el.item} />
      ))}
    </div>
  );
};
