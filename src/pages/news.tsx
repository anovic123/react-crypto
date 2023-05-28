import { FC } from 'react';

import { useGetTopNewsDataQuery } from '../api/newsApi';

import { NewsCard } from '../components/news-card';
import { Spinner } from '../components/spinner';
import { Error } from '../components/error';

interface NewsPageProps {}

export const NewsPage: FC<NewsPageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopNewsDataQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error message={data?.Message} />;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Crypto News</h2>
      {data?.Data.map((el) => (
        <NewsCard key={`news-card-${el.id}`} {...el} />
      ))}
    </div>
  );
};
