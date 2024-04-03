import { faker } from '@faker-js/faker';
import { ChartArea } from 'chart.js';

/**
 * Gradiant Chart
 * @param options, @param labels, @param data
 */
export const gradiantOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Gradiant Chart'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];

export const gradiantData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 }))
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.number.int({ min: -1000, max: 1000 }))
    }
  ]
};

export function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = faker.helpers.arrayElement(colors);
  const colorMid = faker.helpers.arrayElement(colors.filter((color) => color !== colorStart));
  const colorEnd = faker.helpers.arrayElement(colors.filter((color) => color !== colorStart && color !== colorMid));

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}
/****/
