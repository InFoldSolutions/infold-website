'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import config from '@/config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TagsChart({ aggregation }: { aggregation: any }) {
  const [data, setData] = useState<any>(null)
  const [options, setOptions] = useState<any>(null)

  const chartRef = useRef(null)

  useEffect(() => {
    setOptions({
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false,
          labels: {
            font: {
              family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }
          }
        },
        title: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        y: {
          grid: {
            color: "rgba(0, 0, 0, 0)",
          }
        },
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0)",
          }
        }
      }
    })

    setData({
      // @ts-ignore
      labels: Object.keys(aggregation).map((item: string) => config.tagsAggs[item].label),
      datasets: [
        {
          data: Object.values(aggregation),
          // @ts-ignore
          backgroundColor: Object.keys(aggregation).map((item: string) => config.tagsAggs[item].backgroundColor),
          // @ts-ignore
          borderColor: Object.keys(aggregation).map((item: string) => config.tagsAggs[item].borderColor),
          borderWidth: 2
        }
      ]
    })
  }, []);

  if (data)
    return (<Bar ref={chartRef} data={data} options={options} />);
  else
    return (<div className='w-auto text-small text-center py-6 mt-1 mb-3'>Loading ..</div>);
}

