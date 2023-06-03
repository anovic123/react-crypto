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

  if (isError || !data || !id || data?.market_data?.current_price?.usd < 0.01) {
    return null;
  }

  const marketCapChangeColor = data?.market_data?.market_cap_change_24h > 0 ? 'green' : 'red';

  return (
    <div className="border rounded-lg p-2 mb-5">
      <div className="flex justify-between">
        <div className="mr-2">
          <img src={large} alt={name} width={70} height={50} />
        </div>

        <div className="grow">
          <div className="text-2xl cursor-pointer hover:text-red-500" onClick={() => navigate(`/details/${id}`)}>{name}</div>
          <span className="text-lg text-center" style={{ color: marketCapChangeColor }}>
            {data?.market_data?.market_cap_change_percentage_24h.toFixed(2)} %
          </span>
        </div>
        <div className="font-bold text-[1.12rem]">
          {formatCurrency(data?.market_data?.current_price?.usd)}
        </div>
      </div>
      <div className="w-full mt-3">
        <LineChart id={id} />
      </div>
    </div>
  );
};
