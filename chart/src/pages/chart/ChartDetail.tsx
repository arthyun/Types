/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, RadialLinearScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Pie, Doughnut, PolarArea, Radar, Scatter, Bubble } from 'react-chartjs-2';
// import { verticalBarOptions, verticalBarData } from './DataSet/VerticalBarDataSet';
import { horizonBarOptions, horizonBarData } from './DataSet/HorizonBarDataSet';
import { areaOptions, areaData } from './DataSet/AreaDataSet';
import { lineOptions, lineData } from './DataSet/LineDataSet';
import { multiaxisLineOptions, multiaxisLineData } from './DataSet/MultiaxisLineDataSet';
import { pieOptions, pieData } from './DataSet/PieDataSet';
import { doughnutOptions, doughnutData } from './DataSet/DoughnutDataSet';
import { polarOptions, polarData } from './DataSet/PolarAreaDataSet';
import { radarOptions, radarData } from './DataSet/RadarDataSet';
import { scatterOptions, scatterData } from './DataSet/ScatterDataSet';
import { bubbleOptions, bubbleData } from './DataSet/BubbleDataSet';
// import { gradiantOptions, gradiantData, createGradient } from './GradiantDataSet';
import '../../assets/styles/chart.css';

ChartJS.register(CategoryScale, RadialLinearScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// Common Component //
const ChartDetail = ({ type, data, width, height }: { type: string; data?: any; width?: number; height?: number }) => {
  const chartRef = useRef<ChartJS<'bar', number[], string>>(null);
  // const [chartData, setChartData] = useState<ChartData<'bar'>>({
  //   datasets: []
  // });

  // useEffect(() => {
  //   if (chartRef.current) {
  //     // console.log('chartRef ===> ', chartRef.current);
  //   }
  //   // const chartData = {
  //   //       ...gradiantData,
  //   //       datasets: gradiantData.datasets.map((dataset) => ({
  //   //         ...dataset,
  //   //         borderColor: createGradient(chart.ctx, chart.chartArea)
  //   //       }))
  //   //     };
  //   //     setChartData(chartData);
  // }, []);

  // console.log(data?.options);
  // console.log(data?.data);

  // Render //
  if (type === 'verticalBar') {
    return (
      /* Vertical Bar */
      <div className='eachItems'>
        <Bar options={data?.options} data={data?.data} ref={chartRef} width={width} height={height} />
      </div>
    );
  } else if (type === 'horizonBar') {
    return (
      /* Horizon Bar */
      <div className='eachItems'>
        <Bar options={horizonBarOptions} data={horizonBarData} />
      </div>
    );
  } else if (type === 'Area') {
    return (
      /* Area Chart */
      <div className='eachItems'>
        <Line options={areaOptions} data={areaData} />
      </div>
    );
  } else if (type === 'Line') {
    return (
      /* Line Chart */
      <div className='eachItems'>
        <Line options={lineOptions} data={lineData} />
      </div>
    );
  } else if (type === 'MultiaxisLine') {
    return (
      /* Multiaxis Line Chart */
      <div className='eachItems'>
        <Line options={multiaxisLineOptions} data={multiaxisLineData} />
      </div>
    );
  } else if (type === 'Pie') {
    return (
      /* Pie Chart */
      <div className='eachItems'>
        <Pie options={pieOptions} data={pieData} width={width} height={height} />
      </div>
    );
  } else if (type === 'Doughnut') {
    return (
      /* Doughnut Chart */
      <div className='eachItems'>
        <Doughnut options={doughnutOptions} data={doughnutData} width={width} height={height} />
      </div>
    );
  } else if (type === 'PolarArea') {
    return (
      /* PolarArea Chart */
      <div className='eachItems'>
        <PolarArea options={polarOptions} data={polarData} width={width} height={height} />
      </div>
    );
  } else if (type === 'Radar') {
    return (
      /* Radar Chart */
      <div className='eachItems'>
        <Radar options={radarOptions} data={radarData} width={width} height={height} />
      </div>
    );
  } else if (type === 'Scatter') {
    return (
      /* Scatter Chart */
      <div className='eachItems'>
        <Scatter options={scatterOptions} data={scatterData} />
      </div>
    );
  } else if (type === 'Bubble') {
    return (
      /* Bubble Chart */
      <div className='eachItems'>
        <Bubble options={bubbleOptions} data={bubbleData} />
      </div>
    );
  } else if (type === 'Gradiant') {
    return (
      /* Gradiant Chart */
      <div className='eachItems'>
        <p>Deprecated Gradiant Chart</p>
        {/* <Chart ref={chartRef} type='line' options={gradiantOptions} data={chartData} /> */}
      </div>
    );
  } else {
    return <>타입명이 정의되지 않았습니다.</>;
  }
};

export default ChartDetail;
