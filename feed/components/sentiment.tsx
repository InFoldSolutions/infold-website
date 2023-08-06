'use client'

import { useEffect, useRef } from 'react'

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default function Sentiment() {

  const currentColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  const chartRef = useRef(null)
  const options = {
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
      r: {
        grid: {
          color: (currentColorScheme === 'dark') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
          borderDash: [2, 2],
          circular: false,
        },
        ticks: {
          display: false
        },
        pointLabels: {
          padding: 10,
          color: (currentColorScheme === 'dark') ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
          font: {
            size: 12,
            family: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
          }
        }
      }
    }
  }

  const data = {
    labels: ['Positive', 'Neutral', 'Ambiguous', 'Negative'],
    datasets: [
      {
        label: 'Articles',
        data: [10, 8, 4, 8],
        backgroundColor: (currentColorScheme === 'dark') ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        borderColor: (currentColorScheme === 'dark') ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
        borderWidth: 2
      }
    ]
  }

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const newColorScheme = event.matches ? "dark" : "light";
        updateChartTheme(newColorScheme)
      });
  }, []);

  function updateChartTheme(colorScheme: string) {
    if (chartRef.current) {
      const chart = chartRef.current as ChartJS

      if (chart.options) {
        // @ts-ignore 
        chart.options.scales.r.grid.color = (colorScheme === 'dark') ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        // @ts-ignore
        chart.options.scales.r.pointLabels.color = (colorScheme === 'dark') ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
      }

      if (chart.data.datasets) {
        // @ts-ignore
        chart.data.datasets[0].backgroundColor = (colorScheme === 'dark') ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
        // @ts-ignore
        chart.data.datasets[0].borderColor = (colorScheme === 'dark') ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'
      }

      chart.update();
    }
  }

  return <Radar ref={chartRef} data={data} options={options} />;
}

