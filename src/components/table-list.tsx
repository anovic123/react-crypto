import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { TopDataType } from '../common/types/get-top-data';

import TrendUp from '../assets/images/chart/trend-up.svg';
import TrendDown from '../assets/images/chart/trend-down.svg';

interface TableListProps {
  data?: TopDataType[];
}

export const TableList: FC<TableListProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mt-9 border-gray-100 rounded">
      {data?.length === 0 ? (
        <p className="text-center py-4">Нет данных для отображения</p>
      ) : (
        <table className="w-full table-auto">
          <thead className="capitalize text-base text-gray-100 font-medium border-b border-t border-gray-100">
            <tr>
              <th className="py-2">Название</th>
              <th className="py-2">Монета</th>
              <th className="py-2">Цена</th>
              <th className="py-2">Общий объем</th>
              <th className="py-2">Изменение</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el) => (
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
                <td className="py-4">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(el.current_price)}
                </td>
                <td className="py-4">{el.total_volume}</td>
                <td className="py-4 font-bold flex gap-5 items-center justify-center">
                  {el.market_cap_change_percentage_24h > 0 ? (
                    <img src={TrendUp} alt="TrendUp" width={23} height={23} />
                  ) : (
                    <img src={TrendDown} alt="TrendDown" width={23} height={23} />
                  )}
                  <span
                    style={{
                      color: `${el.market_cap_change_percentage_24h > 0 ? '#18cc24' : '#e00909'}`,
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
    </div>
  );
};
