import { FC } from 'react';

import { useGetTopNewsDataQuery } from '../api/newsApi';

import { usePagination } from '../hooks/use-pagination';

import { NewsCard, Spinner, Error, Pagination } from '../components';

interface NewsPageProps {}

const PAGE_SIZE = 10;

export const NewsPage: FC<NewsPageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTopNewsDataQuery();
  console.log("🚀 ~ file: news.tsx:15 ~ data:", data)

  const { currentPage, totalPages, onPageChange, getCurrentPageData } = usePagination(
    data?.Data || [],
    PAGE_SIZE,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error message={data?.Message} />;
  }

  if (!data) {
    return null;
  }

  return (
    <section>
      {getCurrentPageData()?.map((el: any) => (
        <NewsCard key={`news-card-${el.id}`} {...el} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  );
};
