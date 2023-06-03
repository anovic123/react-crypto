import { FC, Fragment } from 'react';

import { DataType } from '../common/types/get-top-news-data';

import { formatDate } from '../utils/formatDate';
import { Text } from './text';

interface NewsCardProps extends DataType {}

export const NewsCard: FC<NewsCardProps> = ({
  source_info,
  imageurl,
  tags,
  title,
  published_on,
  body,
  url,
}) => {
  const parseStringToArray = (str: string) => {
    const words = str.split(/\||\//).slice(0, 2);
    return words.map((word: string, i: number) => (
      <Fragment key={i}>
        <span className="text-cyan-300 font-bold">{word.trim()}</span>
        {i !== words.length - 1 && i < 2 && <i className="px-2">|</i>}
      </Fragment>
    ));
  };

  return (
    <article className="flex flex-wrap gap-5 mb-5 border-b py-3">
      <img src={imageurl} alt={title} className="rounded-xl" height={170} width={300} />
      <div className="md:w-[50%]">
        <div className="flex items-center flex-wrap gap-3">
          <span className="text-lg">{source_info.name}</span>
          <span>{formatDate(published_on)}</span>
        </div>
        <h2
          className="font-bold text-xl cursor-pointer hover:text-red-500"
          onClick={() => window.open(url, '_blank')}
        >
          {title}
        </h2>
        <Text text={body} />
        {tags.length > 2 && (
          <div className="flex items-center flex-wrap gap-2 mt-2">
            <span className="text-lg text-orange-400">Categories:</span>
            <div>{parseStringToArray(tags)}</div>
          </div>
        )}
      </div>
    </article>
  );
};
