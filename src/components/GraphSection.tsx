import React from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphSection: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? 7 : 0,
    config: { duration: 2000 },
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const fullData = [300, 400, 200, 600, 500, 700, 800];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Expenses",
        data: fullData.map((val, i) => (i < number.get() ? val : 0)),
        borderColor: "#4338ca",
        backgroundColor: "rgba(67, 56, 202, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#4338ca",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#4338ca",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#4338ca",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          border: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    animation: false, // Disable Chart.js animations since we're using react-spring
  };

  return (
    <div id="graph" className="mt-20 py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Monthly Expense Overview
        </h2>
        <div
          ref={ref}
          className="w-full md:w-3/4 lg:w-2/3 mx-auto h-[400px] bg-white p-6 rounded-xl shadow-lg"
        >
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GraphSection;