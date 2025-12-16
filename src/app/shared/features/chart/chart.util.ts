import { ChartConfiguration, ChartType } from 'chart.js/auto';

export function buildChartConfig(
  data: number[],
  labels: string[],
  type: ChartType
): ChartConfiguration {
  return {
    type,
    data: {
      labels,
      datasets: [
        {
          data,
          borderColor: '#1d40be', // var(--color-primary-blue)
          borderWidth: 1,
          backgroundColor: '#DDE1FF', // var(--color-primary-light)
          fill: true,
          pointBackgroundColor: '#1c40be', // var(--color-primary-blue)
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: 7,
            callback: value => {
              const numValue = typeof value === 'number' ? value : Number(value);

              if (numValue === 0) {
                return '0';
              }

              return `${numValue / 1000}K`;
            },
          },
        },
      },
    },
  };
}
