import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetDetailsDataQuery } from '../api/coinApi';

import { LineChart, Spinner } from './';

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
    <div className="border rounded-lg p-2 flex flex-wrap gap-2 justify-between mb-5">
      <div className="flex gap-5">
        <img src={large} alt={name} width={70} height={50} />
        <div>
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
        <div className="text-lg" style={{ color: marketCapChangeColor }}>
          {data?.market_data?.market_cap_change_percentage_24h.toFixed(2)} %
        </div>
      </div>
      <div className="w-[200px] md:w-[350px]">
        <LineChart id={id} />
      </div>
    </div>
  );
};
