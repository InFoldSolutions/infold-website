'use client'

import { useEffect, useRef, useState } from 'react'

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

  const [data, setData] = useState<any>(null)
  const [options, setOptions] = useState<any>(null)

  const chartRef = useRef(null)

  useEffect(() => {
    const currentColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";

    setOptions({
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
    })

    setData({
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [
        {
          label: 'Articles',
          data: [10, 8, 4],
          backgroundColor: (currentColorScheme === 'dark') ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
          borderColor: (currentColorScheme === 'dark') ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)',
          borderWidth: 2
        }
      ]
    })

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
        chart.options.scales.r.pointLabels.color = (colorScheme === 'dark') ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'
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

  if (data)
    return (<Radar ref={chartRef} data={data} options={options} />);
  else
    return (<div className='w-auto text-small text-center py-6 mt-1 mb-3'>Loading sentiment ..</div>);
}

