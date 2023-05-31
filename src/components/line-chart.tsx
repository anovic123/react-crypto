import { FC } from 'react';

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
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import moment from 'moment';

import { useGetMarketChartQuery } from '../api/coinApi';

interface LineChartProps {
  id: string;
}

export const LineChart: FC<LineChartProps> = ({ id }) => {
  const { data, isError } = useGetMarketChartQuery({ id, days: 7 });

  const options = {
    responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (!data?.prices) {
    return null;
  }

  const values = {
    labels: data?.prices?.map((element: number[]): string => moment(element[0]).format('DD.MM.YY')),
    datasets: [
      {
        label: 'Price',
        data: data?.prices?.map((element: number[]): number => {
          return element[1] as number;
        }),
        borderColor:
          data?.prices?.[0][1] > data?.prices?.[data?.prices?.length - 1][1]
            ? 'rgb(255, 0, 0)'
            : 'rgb(0, 255, 0)',
        backgroundColor:
          data?.prices?.[0][1] > data?.prices?.[data?.prices?.length - 1][1]
            ? 'rgb(237,85,101)'
            : 'rgb(87,189,15)',
      },
    ],
  };

  return <Line options={options} data={values} width="100%" height="20%" />;
};
