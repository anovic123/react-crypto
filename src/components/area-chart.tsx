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

import { Error } from './';

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

export const AreaChart: FC<AreaChartProps> = ({ id }) => {
  const [days, setDays] = useState<number>(7);

  const { data, isError } = useGetMarketChartQuery({ id, days });

  // if (isError) {
  //   return <Error message={error?.data?.error} />;
  // }

  const options = {
    responsive: true,
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
  return <Line options={options} data={values} width={300} height={100} />;
};
