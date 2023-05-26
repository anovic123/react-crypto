import { FC, useEffect } from 'react';
import { useGetTopPriceDataQuery } from '../api';
import { TableList } from '../components/table-list';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopPriceDataQuery();
  console.log("🚀 ~ file: home.tsx:20 ~ coins:", data)

  return (
    <section>
      <h2 className="font-bold text-2xl">Цены на криптовалюты по рыночной капитализации</h2>
      <TableList data={data} />
    </section>
  );
};
