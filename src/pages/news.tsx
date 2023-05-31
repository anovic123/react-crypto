import { FC } from 'react';

import { useGetTopNewsDataQuery } from '../api/newsApi';

import { NewsCard, Spinner, Error } from '../components'

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
      <h1 className="text-3xl mb-5">Crypto News</h1>
      {data?.Data.map((el) => (
        <NewsCard key={`news-card-${el.id}`} {...el} />
      ))}
    </div>
  );
};
