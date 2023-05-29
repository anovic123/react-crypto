import { FC } from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

import { Button } from './ui-kit/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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

  return (
    <div className="flex justify-center mt-4">
      <nav className="flex items-center justify-between gap-3">
        {currentPage > 1 && (
          <Button
            btnStyle="PRIMARY"
            onClick={() => handlePageClick(currentPage - 1)}
            startIcon={<BsChevronLeft size={20} />}
          />
        )}
        {renderPageNumbers()}
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
