// import { faker } from '@faker-js/faker';
import ChartDetail from './ChartDetail';

export default function Chart() {
  const dummyData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    dataA: [500, 400, 200, 100, 600, 1000, 612],
    dataB: [800, 700, 500, 400, 300, 500, 312]
  };

  // Func //
  const convertData = (fetchedData: any) => {
    return {
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'top' as const // legend의 위치
          },
          title: {
            display: true, // title 보일건지 말건지
            text: 'Vertical Bar Chart'
          }
        }
      },
      data: {
        labels: fetchedData?.labels?.map((item: any) => item),
        datasets: [
          {
            label: 'A',
            data: fetchedData?.dataA?.map((item: any) => item),
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
          {
            label: 'B',
            data: fetchedData?.dataB?.map((item: any) => item),
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          }
        ]
      }
      // sum: fetchedData?.map((item) => item.cnt).reduce((acc, cur) => acc + cur, 0) ?? 0
    };
  };

  return (
    <div className='container'>
      <ChartDetail type='verticalBar' data={convertData(dummyData)} width={400} height={250} />
      <ChartDetail type='horizonBar' data={undefined} />
      <ChartDetail type='Area' data={undefined} />
      <ChartDetail type='Line' data={undefined} />
      <ChartDetail type='MultiaxisLine' data={undefined} />
      <ChartDetail type='Pie' data={undefined} width={400} height={250} />
      <ChartDetail type='Doughnut' data={undefined} width={400} height={250} />
      <ChartDetail type='PolarArea' data={undefined} width={400} height={250} />
      <ChartDetail type='Radar' data={undefined} width={400} height={250} />
      <ChartDetail type='Scatter' data={undefined} />
      <ChartDetail type='Bubble' data={undefined} />
      <ChartDetail type='Gradiant' data={undefined} />
      <ChartDetail type='' data={undefined} />
    </div>
  );
}
