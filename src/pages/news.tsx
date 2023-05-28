import { FC } from 'react';

import { useGetTopNewsDataQuery } from '../api/newsApi';
import { NewsCard } from '../components/news-card';

interface NewsPageProps {}

export const NewsPage: FC<NewsPageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopNewsDataQuery();
  console.log("🚀 ~ file: news.tsx:10 ~ data:", data)

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
        <NewsCard key={`news-card-${el.id}`} {...el} />
      ))}
    </div>
  );
};
