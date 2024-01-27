import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { simpleFaker as faker} from '@faker-js/faker';
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material";
import { monthShort } from "../../constants/months";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = monthShort;

// const data = {
//   labels,
//   datasets: [
//     {
//       //   label: "Dataset 1",
//       data: labels.map(() => faker.number.int({ min: 5000, max: 50_000 })),
//       backgroundColor: "#34CAA5",
//       borderRadius: 100,
//     },
//   ],
// };

function createGradient(ctx, area) {
  const colorStart = "#34CAA500";
  const colorEnd = "#34CAA5";

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export function Barchart() {
    const theme= useTheme()
  const chartRef = useRef(null);
  //   const [chart, setChart] = useState(null);
  const [chartData, setChartData] = useState({ datasets: [{}] });
  useEffect(() => {
    const _chart = chartRef.current;
    if (!_chart) {
      return;
    }
    const _chartBg = createGradient(_chart.ctx, _chart.chartArea);
    const _chartData = {
      labels,
      datasets: [
        {
          data: labels.map(() =>
            faker.number.int({ min: 5000, max: 50_000 })
          ),
          backgroundColor: _chartBg,
          borderRadius: 100,
          maxBarThickness: 30,
        },
      ],
    };
    setChartData(_chartData);
  }, []);
  return (
    <Bar
      ref={chartRef}
      options={{
        aspectRatio: 766 /288,
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
                color: theme.palette.text_.neutrl_600
            }
          },
          y: {
            max: 50000,
            ticks: {
              padding: 23,
              color: theme.palette.text_.neutrl_600,
              stepSize: 5000,
            },
            grid: {
              drawTicks: false,
            },
            border: {
              display: false,
            },
          },
        },
        responsive: true,
        plugins: {
          tooltip: {
            mode: "index",
          },
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: false,
            text: "Chart.js Bar Chart",
          },
        },
      }}
      data={chartData}
    />
  );
}
