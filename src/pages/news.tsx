import { FC } from 'react';

import { useGetTopNewsDataQuery } from '../api/newsApi';
import { CryptoCard } from '../components/crypto-card';

interface NewsPageProps {}

export const NewsPage: FC<NewsPageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopNewsDataQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Crypto News</h2>
      {data?.Data.map((el) => (
        <CryptoCard key={`news-card-${el.id}`} {...el} />
      ))}
    </div>
  );
};
