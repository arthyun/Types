import './App.css';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more.js';
import highchartsSolidGauge from 'highcharts/modules/solid-gauge.js';

highchartsMore(Highcharts);
highchartsSolidGauge(Highcharts);

// (function (Highcharts) {
//   (Highcharts as any).seriesTypes.solidgauge.prototype.setTitle = function (titleOption) {
//     var chart = this.chart,
//       center = this.center || (this.yAxis && this.yAxis.center),
//       labelBBox,
//       box,
//       format;
//     if (center && titleOption) {
//       box = {
//         x: chart.plotLeft + center[0] - 0.5 * center[2],
//         y: chart.plotTop + center[1] - 0.5 * center[2],
//         width: center[2],
//         height: center[2]
//       };

//       format = titleOption.text || titleOption.format;
//       format = Highcharts.format(format, this);

//       if (this.title) {
//         this.title.attr({
//           text: format
//         });
//       } else {
//         this.title = this.chart.renderer.label(format).css(titleOption.style).add();
//       }
//       labelBBox = this.title.getBBox();
//       titleOption.width = labelBBox.width;
//       titleOption.height = labelBBox.height;
//       this.title.align(titleOption, null, box);
//     }
//   };

//   Highcharts.wrap((Highcharts as any).seriesTypes.solidgauge.prototype, 'render', function (proceed) {
//     proceed.call(this);
//     this.setTitle(this.options.title);
//   });
// })(Highcharts);

const areaOptions = {
  title: {
    text: 'Title',
    align: 'center'
  },
  subtitle: {
    text: 'Sub Title',
    align: 'center'
  },
  series: [
    {
      type: 'area',
      data: [1, 5, 16, 10, 20],
      lineWidth: 6.5,
      name: 'Series name'
    }
  ],
  xAxis: {
    title: {
      text: 'xAxis title'
    },
    // type: '',
    categories: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {
    title: {
      text: 'yAxis title'
    }
  },
  legend: {
    enabled: true
  }
  // tooltip: {
  //   valueDecimals: 2
  // }
};

const gaugeOptions = {
  chart: {
    type: 'solidgauge'
  },
  title: null,
  pane: {
    center: ['50%', '85%'],
    size: '140%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },
  exporting: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  yAxis: {
    min: 0,
    max: 100,
    stops: [
      [0.1, '#55BF3B'], // green
      [0.5, '#DDDF0D'], // yellow
      [0.9, '#DF5353'] // red
    ],
    lineWidth: 0,
    tickWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      text: 'Speed',
      y: -70
    },
    labels: {
      y: 16
    }
  },
  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: -70,
        borderWidth: 0,
        useHTML: true
      }
    }
  },
  credits: {
    enabled: false
  },
  series: {
    name: 'Speed',
    data: [80],
    dataLabels: {
      format: '<div style="text-align:center">' + '<span style="font-size:50px">{y}</span><br/>' + '<span style="font-size:12px;opacity:0.4">km/h</span>' + '</div>'
    },
    tooltip: {
      valueSuffix: ' km/h'
    }
  }
};

export default function App() {
  return (
    <div style={{ display: 'flex' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={areaOptions}
        // constructorType={'barChart'}
        // allowChartUpdate={true}
        // immutable={false}
        // updateArgs={[true, true, true]}
        // containerProps={{ className: 'chartContainer' }}
        // callback={() => {}}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={gaugeOptions}
        // constructorType={'barChart'}
        // allowChartUpdate={true}
        // immutable={false}
        // updateArgs={[true, true, true]}
        // containerProps={{ className: 'chartContainer' }}
        // callback={() => {}}
      />
    </div>
  );
}
