// import { faker } from '@faker-js/faker';

/**
 * Doughnut Chart
 * @param options, @param labels, @param data
 */
export const doughnutOptions = {
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
      text: 'Doughnut Chart'
    }
    // sum: org?.map((dept) => dept.cnt).reduce((acc, cur) => acc + cur, 0) ?? 0
  }
};
export const doughnutData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 1
    }
  ]
};
/****/
