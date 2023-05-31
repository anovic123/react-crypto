import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TopDataType } from '../common/types/get-top-data';

import { formatCurrency } from '../utils/formatCurrency';

import { Pagination } from './';

import TrendUp from '../assets/images/chart/trend-up.svg';
import TrendDown from '../assets/images/chart/trend-down.svg';

interface CryptoTableListProps {
  data?: TopDataType[];
  title?: string;
}

const PAGE_SIZE = 13;

export const CryptoTableList: FC<CryptoTableListProps> = ({ data, title }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil((data?.length || 0) / PAGE_SIZE);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data?.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* <h1 className="font-bold text-3xl mb-5">{title}</h1> */}
      <div className="flex flex-col mt-9 border pb-3 border-gray-100 rounded-md">
        {data?.length === 0 ? (
          <p className="text-center py-4">No data to display</p>
        ) : (
          <table className="w-full table-auto">
            <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
              <tr>
                <th className="py-2">Asset</th>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">Total Volume</th>
                <th className="py-2">Market Cap Change</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData()
                ?.filter((el) => el.current_price > 0.01)
                ?.map((el) => (
                  <tr
                    key={el.id}
                    className="text-center text-base border-b ease-in duration-300 border-gray-100 hover:bg-[#e6e6e7] hover:text-black cursor-pointer last:border-b-0"
                    onClick={() => navigate(`details/${el.id}`)}
                  >
                    <td className="py-4 flex gap-5 items-center justify-center uppercase">
                      <img src={el.image} alt={el.symbol} width={30} height={30} />
                      <span>{el.symbol}</span>
                    </td>
                    <td className="py-4">{el.name}</td>
                    <td className="py-4">{formatCurrency(el.current_price)}</td>
                    <td className="py-4">{new Intl.NumberFormat().format(el.total_volume)}</td>
                    <td className="py-4 font-bold flex gap-5 items-center justify-center">
                      {el.market_cap_change_percentage_24h > 0 ? (
                        <img src={TrendUp} alt="TrendUp" width={23} height={23} />
                      ) : (
                        <img src={TrendDown} alt="TrendDown" width={23} height={23} />
                      )}
                      <span
                        style={{
                          color: `${
                            el.market_cap_change_percentage_24h > 0 ? '#18cc24' : '#e00909'
                          }`,
                        }}
                      >
                        {Number(el.market_cap_change_percentage_24h).toFixed(2)} %
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};