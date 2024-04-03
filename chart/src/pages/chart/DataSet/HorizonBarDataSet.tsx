import { faker } from '@faker-js/faker';

/**
 * Horizon Bar Chart
 * @param options, @param labels, @param data
 */
export const horizonBarOptions = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const // legend의 위치
    },
    title: {
      display: true, // title 보일건지 말건지
      text: 'Horizon Bar Chart'
    }
  }
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const horizonBarData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};
/****/
