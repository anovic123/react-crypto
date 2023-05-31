import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '../utils/formatCurrency';
import { createMarkup } from '../utils/createMarkup';

import { useAppDispatch } from '../hooks/redux';

import { Button } from './';

import { removeFavorite } from '../store/slice/favorite';

interface FavoriteCardProps {
  id: string;
  image: string;
  description: string;
  title: string;
  price: number;
}

export const FavoriteCard: FC<FavoriteCardProps> = ({ id, image, description, title, price }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const truncatedDescription = description.slice(0, 150);

  const displayDescription =
    description.length > 150 ? `${truncatedDescription}...` : truncatedDescription;

  const handleRemoveItem = () => {
    if (window.confirm('Are you sure you want to clear?')) {
      dispatch(removeFavorite(id));
    }
  };

  return (
    <div className="border rounded-xl p-3 mb-5">
      <div className="flex gap-3 mb-2">
        <img src={image} alt={title} width={30} height={30} />
        <h2
          className="text-3xl font-bold cursor-pointer hover:text-red-500"
          onClick={() => navigate(`/details/${id}`)}
        >
          {title}
        </h2>
      </div>
      <p className="mb-4 text-xl" dangerouslySetInnerHTML={createMarkup(displayDescription)} />
      <div className="flex gap-2 justify-between flex-wrap">
        <span className="text-green-500 font-bold text-2xl">{formatCurrency(price)}</span>
        <Button btnStyle="PURPLE" variant="ROUNDED" onClick={handleRemoveItem}>
          Remove
        </Button>
      </div>
    </div>
  );
};