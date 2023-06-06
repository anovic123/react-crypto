import { FC, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import { useGetMarketChartQuery } from '../api/coinApi';

import { Button, Error } from './';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface AreaChartProps {
  id: string;
}

const daysArray = [
  {
    data: 1,
    number: 24,
    time: 'Hours',
  },
  {
    data: 7,
    number: 7,
    time: 'Days',
  },
  {
    data: 30,
    number: 30,
    time: 'Days',
  },
  {
    data: 90,
    number: 3,
    time: 'Month',
  },
  {
    data: 365,
    number: 1,
    time: 'Year',
  },
];

export const AreaChart: FC<AreaChartProps> = ({ id }) => {
  const [days, setDays] = useState<number>(30);

  const { data, isError } = useGetMarketChartQuery({ id, days });

  // if (isError) {
  //   return <Error message={error?.data?.error} />;
  // }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const values = {
    labels: data?.prices?.map((element: number[]): string => moment(element[0]).format('DD.MM.YY')),
    datasets: [
      {
        label: 'Price',
        data: data?.prices?.map((element: number[]): number => {
          return element[1] as number;
        }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, '#2BC08C');
          return gradient;
        },
      },
    ],
  };

  const handleButtonClick = (numDays: number) => {
    setDays(numDays);
  };

  return (
    <div>
      <Line options={options} data={values} />
      <div className="flex gap-3 sm:gap-10 justify-center flex-wrap mt-3">
        {daysArray.map((el) => (
          <Button
            key={el.data}
            btnStyle={el.data === days ? 'RED' : 'ORANGE'}
            onClick={() => handleButtonClick(el.data)}
          >
            {el.number} {el.time}
          </Button>
        ))}
      </div>
    </div>
  );
};
