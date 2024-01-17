'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 13
      }
    },
  }
};

const labels = ['Dec', 'Oct', 'July', 'May', 'Jan'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Trends',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgba(59, 130, 246, 0.9)',
      backgroundColor: 'rgba(59, 130, 246, 0.9)',
    },
    {
      label: 'Sentiment',
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgba(239, 68, 68, 1)',
      backgroundColor: 'rgba(239, 68, 68, 1)',
    },
  ],
};

export default function TrendsChart() {
  return <Line options={options} data={data} />;
}
