import React from 'react';
import {
   Chart as ChartJS,
   ArcElement,
   LinearScale,
   CategoryScale,
   BarElement,
   PointElement,
   LineElement,
   Legend,
   Tooltip,
   LineController,
   BarController,
} from 'chart.js';
import { Chart, Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

ChartJS.register(
   ArcElement,
   LinearScale,
   CategoryScale,
   BarElement,
   PointElement,
   LineElement,
   Legend,
   Tooltip,
   LineController,
   BarController
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const chartData = {
   labels,
   datasets: [
      {
         type: 'line' as const,
         label: 'Dataset 1',
         borderColor: 'rgb(255, 99, 132)',
         borderWidth: 2,
         fill: false,
         data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      },
      {
         type: 'bar' as const,
         label: 'Dataset 2',
         backgroundColor: 'rgb(75, 192, 192)',
         data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
         borderColor: 'white',
         borderWidth: 2,
      },
      {
         type: 'bar' as const,
         label: 'Dataset 3',
         backgroundColor: 'rgb(53, 162, 235)',
         data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
      },
   ],
};

const pieData = {
   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
   datasets: [
      {
         label: '# of Votes',
         data: [12, 19, 3, 5, 2, 3],
         backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
         ],
         borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
         ],
         borderWidth: 1,
      },
   ],
};

const ChartPage = () => {
   return (
      <Grid container spacing={3}>
         <Grid item xs={12}>
            <h2>Chart</h2>
         </Grid>

         <Grid item xs={12} md={8} lg={9}>
            <Paper
               sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
               }}
            >
               <Chart type="bar" data={chartData} />
            </Paper>
         </Grid>

         <Grid item xs={12} md={4} lg={3}>
            <Paper
               sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
               }}
            >
               <Pie data={pieData} />
            </Paper>
         </Grid>
      </Grid>
   );
};

export default ChartPage;
