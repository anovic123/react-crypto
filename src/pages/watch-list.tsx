import { FC, useRef, useEffect } from 'react';

import { Button, FavoriteCard } from '../components';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { clearFavoriteList } from '../store/slice/favorite';

interface WatchListProps {}

export const WatchList: FC<WatchListProps> = () => {
  const dispatch = useAppDispatch();

  const { favoriteData } = useAppSelector((state) => state.favorite);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [favoriteData]);

  if (!favoriteData || favoriteData.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-2xl md:text-3xl">
        Your favorite list is empty
      </div>
    );
  }

  const handleClearList = () => {
    if (window.confirm('Are you sure you want to clear?')) {
      dispatch(clearFavoriteList());
    }
  };

  return (
    <section className="mt-2">
      <div className="h-[75vh] mb-3 overflow-y-auto" ref={scrollRef}>
        {favoriteData.map((el: any) => (
          <FavoriteCard key={el.id} {...el} />
        ))}
      </div>

      <div className="border-t py-2">
        {favoriteData.length && (
          <Button btnStyle="RED" onClick={handleClearList}>
            Clear List
          </Button>
        )}
      </div>
    </section>
  );
};
