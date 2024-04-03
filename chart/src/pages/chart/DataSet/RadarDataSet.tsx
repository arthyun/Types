// import { faker } from '@faker-js/faker';

/**
 * Radar Chart
 * @param options, @param labels, @param data
 */
export const radarOptions = {
  responsive: false,
  plugins: {
    legend: {
      display: false,
      position: 'right' as const
    },
    datalabels: {
      display: true,
      color: '#fff',
      align: 'center',
      anchor: 'center',
      font: {
        size: '12'
      }
    },
    title: {
      display: true,
      text: 'Radar Chart'
    }
    // sum: org?.map((dept) => dept.cnt).reduce((acc, cur) => acc + cur, 0) ?? 0
  }
};
export const radarData = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }
  ]
};
/****/
