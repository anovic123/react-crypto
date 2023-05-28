import { FC, useEffect, useState } from 'react';

interface PriceRangeProps {
  price: number;
  low: number;
  high: number;
}

export const PriceRange: FC<PriceRangeProps> = ({ price, low, high }) => {
  const [greenWidth, setGreenWidth] = useState<number>(0);

  useEffect(() => {
    let totalRange = high - low;
    let greenWidthPercent = ((high - price) * 100) / totalRange;
    setGreenWidth(Math.ceil(greenWidthPercent));
  }, [price, high, low]);

  const redColorClass = 'bg-red-500';
  const greenColorClass = 'bg-green-500';

  return (
    <div className="price-range-container w-full h-2 bg-gray-300 rounded">
      <div className="relative h-full">
        <div
          className={`absolute left-0 top-0 h-full ${redColorClass} rounded-l`}
          style={{ width: `${100 - greenWidth}%` }}
        ></div>
        <div
          className={`absolute right-0 top-0 h-full ${greenColorClass} rounded-r`}
          style={{ width: `${greenWidth}%` }}
        ></div>
      </div>
    </div>
  );
};
