import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { simpleFaker as faker } from '@faker-js/faker';
import { useEffect, useRef, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 0,
    },
  },
  aspectRatio: 104 / 32,
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    labels: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

function createGradient(ctx, area, pctChange) {
  const colorStart = pctChange < 0 ? "#ED544E00" : "#77B90000";
  const colorEnd = pctChange < 0 ? "#ED544E55" : "#77B90055";

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

const labels = new Array(9).fill("");

// const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

export function AreaChart({ pctChange }) {
  const chartRef = useRef(null);
  //   const [chart, setChart] = useState(null);
  const [chartData, setChartData] = useState({ datasets: [{}] });
  useEffect(() => {
    const _chart = chartRef.current;
    if (!_chart) {
      return;
    }
    const _chartBg = createGradient(_chart.ctx, _chart.chartArea, pctChange);
    const _chartData = {
      labels,
      datasets: [
        {
          borderCapStyle: "square",
          fill: true,
          data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
          borderColor: pctChange < 0 ? "#ED544E" : "#66C87B",
          backgroundColor: _chartBg,
        },
      ],
    };
    setChartData(_chartData);
  }, [pctChange]);
  return (
    <Line
      ref={chartRef}
      options={options}
      data={chartData}
    />
  );
}
