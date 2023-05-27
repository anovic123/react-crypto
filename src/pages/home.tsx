import React, { FC } from 'react';

import { useGetTopPriceDataQuery } from '../api/coinApi';

import { TableList } from '../components/table-list';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopPriceDataQuery();

  return (
    <section>
      <TableList title="Cryptocurrency prices by market capitalization" data={data} />
    </section>
  );
};
