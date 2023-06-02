import { FC } from 'react';

import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

import { useMediaQuery } from '../hooks/use-media-query';

import { Button } from './';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isMobile = useMediaQuery(425);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Button
          variant="ROUNDED"
          btnStyle="PURPLE"
          key={i}
          onClick={() => handlePageClick(i)}
          style={{ backgroundColor: currentPage === i ? 'red' : '' }}
        >
          {i}
        </Button>,
      );
    }

    return pageNumbers;
  };

  const renderPage = isMobile ? currentPage : renderPageNumbers();

  return (
    <div className="flex justify-center mt-4 w-full overflow-x-auto px-5">
      <nav className="flex items-center justify-between gap-3">
        {currentPage > 1 && (
          <Button
            btnStyle="PRIMARY"
            onClick={() => handlePageClick(currentPage - 1)}
            startIcon={<BsChevronLeft size={20} />}
          />
        )}
        {renderPage}
        {currentPage < totalPages && (
          <Button
            btnStyle="PRIMARY"
            onClick={() => handlePageClick(currentPage + 1)}
            endIcon={<BsChevronRight size={20} />}
          />
        )}
      </nav>
    </div>
  );
};
