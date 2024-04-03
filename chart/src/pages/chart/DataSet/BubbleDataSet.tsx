import { faker } from '@faker-js/faker';

/**
 * Bubble Chart
 * @param options, @param labels, @param data
 */
export const bubbleOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Bubble Chart'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export const bubbleData = {
  datasets: [
    {
      label: 'Red dataset',
      data: Array.from({ length: 50 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
        r: faker.number.int({ min: 5, max: 20 })
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Blue dataset',
      data: Array.from({ length: 50 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
        r: faker.number.int({ min: 5, max: 20 })
      })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};
/****/
