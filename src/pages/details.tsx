import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { AiOutlineCopy, AiOutlineStar } from 'react-icons/ai';

import { useGetDetailsDataQuery } from '../api/coinApi';

import { AreaChart, PriceRange, Spinner, Button, Error } from '../components';

import { formatCurrency } from '../utils/formatCurrency';
import { createMarkup } from '../utils/createMarkup';

import { useAppDispatch } from '../hooks/redux';

import { addFavorite } from '../store/slice/favorite';

interface DetailsPageProps {}

export const DetailsPage: FC<DetailsPageProps> = ({}) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  if (!id) {
    return null;
  }

  const { data, isLoading, isError, error } = useGetDetailsDataQuery(id);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Successfully added to clipboard');
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    // @ts-ignore
    return <Error message={error?.data?.error} />;
  }

  const onClickAdd = () => {
    if (
      !data ||
      !data.name ||
      !data.market_data?.market_cap?.usd ||
      !data.description?.en ||
      !data.image?.thumb
    ) {
      return;
    }

    const item = {
      id: id,
      title: data.name,
      price: data.market_data.current_price?.usd,
      description: data.description.en,
      image: data.image.thumb,
    };

    dispatch(addFavorite(item));
  };

  return (
    <section className="mt-5 h-full">
      <div className="mb-1 flex flex-wrap justify-between gap-5">
        <div className="w-full md:w-auto">
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
            <h1 className="text-4xl font-bold">{data?.name}</h1>
          </div>
          <div className="mb-3 flex items-center gap-5">
            <span className="font-bold text-2xl">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex justify-between w-full gap-3 border-b py-1">
              <span>Market Cap</span>
              <span>{formatCurrency(Number(data?.market_data?.market_cap?.usd))}</span>
            </div>
            <div className="flex justify-between w-full gap-3 border-b py-1">
              <span>24 Hour Trading Vol</span>
              <span>{formatCurrency(Number(data?.market_data?.total_volume?.usd))}</span>
            </div>
            <div className="flex justify-between w-full gap-3 border-b py-1">
              <span>Low 24H</span>
              <span>{formatCurrency(Number(data?.market_data?.low_24h?.usd))}</span>
            </div>
            <div className="flex justify-between w-full gap-3 border-b py-1">
              <span>High 24H</span>
              <span>{formatCurrency(Number(data?.market_data?.high_24h?.usd))}</span>
            </div>
          </div>
          <div className="my-5 w-full">
            <PriceRange
              price={Number(data?.market_data?.current_price?.usd)}
              high={Number(data?.market_data?.high_24h?.usd)}
              low={Number(data?.market_data?.low_24h?.usd)}
            />
          </div>
        </div>
        <div>
          <div className="text-2xl my-3">Info</div>

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
            <div className="flex flex-wrap items-center gap-3">
              {data?.links?.homepage
                .filter((el) => el.length > 1)
                .slice(0, 1)
                .map((el: string) => (
                  <Button key={el} onClick={() => window.open(el, '_blank')}>
                    {el}
                  </Button>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xl mb-3">
            <div>CoinGecko Score:</div>
            <span>{data?.coingecko_score.toFixed(2)}</span>
          </div>

          <div className="text-xl flex items-center flex-wrap gap-3">
            <Button btnStyle="ORANGE" endIcon={<AiOutlineStar size={20} />} onClick={onClickAdd}>
              Add to favorite
            </Button>
            <div className="flex items-center gap-1 text-lg px-2 py-1 rounded-lg border">
              <AiOutlineStar size={20} color="orange" />
              on {data?.watchlist_portfolio_users} watchlists
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <AreaChart id={id} />
      </div>
      {data?.description?.en && (
        <p
          className="details-description"
          dangerouslySetInnerHTML={createMarkup(data?.description?.en)}
        ></p>
      )}
    </section>
  );
};