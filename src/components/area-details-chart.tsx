import { FC, useState, useEffect } from 'react';
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
import { useGetMarketChartQuery } from '../api';

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

interface AreaDetailsChartProps {
  id: string;
}

export const AreaDetailsChart: FC<AreaDetailsChartProps> = ({ id }) => {
  const [days, setDays] = useState<number>(7);

  const { data, isLoading, isError } = useGetMarketChartQuery({ id, days });

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
        label: 'Цена',
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
