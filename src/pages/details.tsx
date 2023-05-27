import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { AiOutlineCopy } from 'react-icons/ai';

import { useGetDetailsDataQuery } from '../api/coinApi';

import { AreaDetailsChart } from '../components/area-details-chart';
import { Button } from '../components/ui-kit/button';

import { toast } from 'react-toastify';

interface DetailsPageProps {}

export const DetailsPage: FC<DetailsPageProps> = ({}) => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { data, isLoading, isError } = useGetDetailsDataQuery(id);

  // console.log('🚀 ~ file: details.tsx:12 ~ data:', data);

  const createMarkup = (html: string) => ({ __html: html });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Successfully added to clipboard');
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred.</p>;
  }

  return (
    <section className="mt-5">
      <div className="mb-10 grid grid-cols-2 gap-5">
        <div>
          <span className="bg-zinc-900 px-2 py-1 rounded-md">
            Rank #{data?.coingecko_rank || 0}
          </span>
          <div className="flex gap-2 items-center my-5">
            <img
              src={data?.image?.thumb || data?.image?.small}
              height={30}
              width={30}
              alt={data?.name}
            />
            <h1 className="text-3xl font-bold">{data?.name}</h1>
          </div>
          <div className="mb-3 flex items-center gap-5">
            <span className="font-bold text-xl">
              {formatCurrency(Number(data?.market_data?.current_price?.usd))}
            </span>
            {data?.market_data?.market_cap_change_percentage_24h && (
              <div className="flex gap-1 items-center">
                {data?.market_data?.market_cap_change_percentage_24h > 0 ? (
                  <GoTriangleUp className="text-green-500 text-lg" />
                ) : (
                  <GoTriangleDown className="text-red-500 text-lg" />
                )}
                <span
                  className={`text-lg ${
                    data?.market_data?.market_cap_change_percentage_24h > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {data?.market_data?.market_cap_change_percentage_24h.toFixed(2)} %
                </span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex justify-between gap-3 border-b py-1">
              <span>Market Cap</span>
              <span>{formatCurrency(Number(data?.market_data?.market_cap?.usd))}</span>
            </div>
            <div className="flex justify-between gap-3 border-b py-1">
              <span>24 Hour Trading Vol</span>
              <span>{formatCurrency(Number(data?.market_data?.total_volume?.usd))}</span>
            </div>
            <div className="flex justify-between gap-3 border-b py-1">
              <span>Low 24H</span>
              <span>{formatCurrency(Number(data?.market_data?.low_24h?.usd))}</span>
            </div>
            <div className="flex justify-between gap-3 border-b py-1">
              <span>High 24H</span>
              <span>{formatCurrency(Number(data?.market_data?.high_24h?.usd))}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-2xl mb-5">Info</div>

          <div className="flex items-center gap-3 text-xl mb-3">
            <div>Api id</div>
            <Button
              endIcon={<AiOutlineCopy />}
              onClick={() => copyToClipboard(data?.id || '')}
              btnStyle="PRIMARY"
            >
              {data?.id}
            </Button>
          </div>

          <div className="flex items-center gap-3 text-xl mb-3">
            <div>Links</div>
            <div className="flex items-center gap-3">
              {data?.links?.homepage
                .filter((el) => el.length > 1)
                .map((el: string) => (
                  <Button key={el} onClick={() => window.open(el, '_blank')}>
                    {el}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <AreaDetailsChart id={id} />
      {data?.description?.en && (
        <p
          className="details-description"
          dangerouslySetInnerHTML={createMarkup(data?.description?.en)}
        ></p>
      )}
    </section>
  );
};
