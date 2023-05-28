import React, { FC } from 'react';

import { useGetTopPriceDataQuery } from '../api/coinApi';

import { CryptoTableList } from '../components/crypto-table-list';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopPriceDataQuery();
  console.log("🚀 ~ file: home.tsx:11 ~ data:", data)

  return (
    <section>
      <CryptoTableList title="Cryptocurrency prices by market capitalization" data={data} />
    </section>
  );
};
