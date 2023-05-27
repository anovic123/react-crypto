import React, { FC } from 'react';

import { useGetTopPriceDataQuery } from '../api';

import { TableList } from '../components/table-list';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopPriceDataQuery();
  // console.log('🚀 ~ file: home.tsx:20 ~ coins:', data);

  return (
    <section>
      <TableList title="Cryptocurrency prices by market capitalization" data={data} />
    </section>
  );
};
