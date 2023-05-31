import { FC } from 'react';

import { useGetTopPriceDataQuery } from '../api/coinApi';

import { CryptoTableList, Error, HomeBanner, Spinner } from '../components'

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError, error } = useGetTopPriceDataQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    // @ts-ignore
    return <Error message={error?.data?.error} />;
  }

  return (
    <section className="h-full">
      <CryptoTableList title="Cryptocurrency prices by market capitalization" data={data} />
      <HomeBanner />
    </section>
  );
};