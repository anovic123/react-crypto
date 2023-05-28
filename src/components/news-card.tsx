import { FC, Fragment } from 'react';

import { DataType } from '../common/types/get-top-news-data';

import { formatDate } from '../utils/formatDate';

interface NewsCardProps extends DataType {}

export const NewsCard: FC<NewsCardProps> = ({
  source_info,
  imageurl,
  tags,
  title,
  published_on,
  body,
}) => {
  const parseStringToArray = (str: string) => {
    const words = str.split('|').slice(0, 5)
    return words.map((word, i) => (
      <Fragment key={i}>
        <span className="text-cyan-300 font-bold">{word.trim()}</span>
        <i className="px-2">{i !== words.length - 1 && '|'}</i>
      </Fragment>
    ));
  };

  return (
    <article className="flex gap-3 mb-5 border-b py-3">
      <img src={imageurl} alt={title} className="rounded-sm" height={100} width={100} />
      <div>
        <div className="flex items-center gap-3">
          <span className="font-xs text-lg">{source_info.name}</span>
          <span>{formatDate(published_on)}</span>
        </div>
        <h2 className="font-bold text-xl cursor-pointer hover:text-red-500">{title}</h2>
        <p>{body.slice(0, 150)}...</p>
        {tags.length > 2 && (
          <div className="flex items-center gap-2">
            <span className="text-lg text-orange-400 mr-1">Categories:</span>
            <div>{parseStringToArray(tags)}</div>
          </div>
        )}
      </div>
    </article>
  );
};
