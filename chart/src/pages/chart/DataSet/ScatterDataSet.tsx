import { faker } from '@faker-js/faker';

/**
 * Scatter Chart
 * @param options, @param labels, @param data
 */
export const scatterOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Scatter Chart'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export const scatterData = {
  datasets: [
    {
      label: 'A dataset',
      data: Array.from({ length: 100 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 })
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)'
    }
  ]
};
/****/
