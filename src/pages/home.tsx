import React, { FC } from 'react';

import { useGetTopPriceDataQuery } from '../api/coinApi';

import { CryptoTableList } from '../components/crypto-table-list';
import { Error } from '../components/error';
import { HomeBanner } from '../components/home-banner';
import { Spinner } from '../components/spinner';


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