import { useState } from 'react';

interface PaginationOptions<T> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getCurrentPageData: () => T[];
}

export const usePagination = <T>(data: T[], pageSize: number): PaginationOptions<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data
      ?.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages: Math.ceil((data?.length || 0) / pageSize),
    onPageChange: handlePageChange,
    getCurrentPageData,
  };
};