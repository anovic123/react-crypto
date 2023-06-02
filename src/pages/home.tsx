import { FC } from 'react';

import { useGetTopPriceDataQuery } from '../api/coinApi';

import { CryptoTableList, Error, HomeBanner, Spinner, Preloader, AreaChart } from '../components';

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = ({}) => {
  const { data, isLoading, isError, error } = useGetTopPriceDataQuery();
  console.log('🚀 ~ file: home.tsx:11 ~ data:', data);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  if (isError) {
    // @ts-ignore
    return <Error message={error?.data?.error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Preloader>
      <section className="h-full">
        <HomeBanner />
        <CryptoTableList title="Cryptocurrency prices by market capitalization" data={data} />
      </section>
    </Preloader>
  );
};
