import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetDetailsDataQuery } from '../api/coinApi';

import { LineChart } from './';

import { formatCurrency } from '../utils/formatCurrency';

import { ItemCoin } from '../common/types/get-trending-data';

interface TrendingCardProps extends ItemCoin {}

export const TrendingCard: FC<TrendingCardProps> = ({ name, large, id }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetDetailsDataQuery(id);

  if (isError || !data || data?.market_data?.current_price?.usd < 0.01) {
    return null;
  }

  const marketCapChangeColor = data?.market_data?.market_cap_change_24h > 0 ? 'green' : 'red';

  return (
    <div className="border rounded-lg p-2 flex flex-wrap sm:flex-row gap-2 justify-between mb-5">
      <div className="flex gap-5 ">
        <div>
          <img src={large} alt={name} width={70} height={50} />
          <div className="text-lg text-center" style={{ color: marketCapChangeColor }}>
            {data?.market_data?.market_cap_change_percentage_24h.toFixed(2)} %
          </div>
        </div>
        <div className="">
          <div
            className="text-2xl cursor-pointer hover:text-red-500"
            onClick={() => navigate(`/details/${id}`)}
          >
            {name}
          </div>
          <div className="font-bold text-[1.12rem]">
            {formatCurrency(data?.market_data?.current_price?.usd)}
          </div>
        </div>
      </div>
      <div className="w-[12.5rem] md:w-[21.875rem]">
        <LineChart id={id} />
      </div>
    </div>
  );
};
