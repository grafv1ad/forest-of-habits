import React, { useState } from "react";
import { Line, Pie, Bar, Bubble } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import TitleComponent from "components/Title";
import { useTreeIncrements } from "hooks/useTreeIncrements";
import { ReactComponent as Arrow } from "images/arrow.svg";
import { TreeStatisticsProps } from "types/treeStatistics";
import {
  getCopiedDate,
  getDaysInMonth,
  getMonthName,
  getWeekdayName,
} from "utils/date";

Chart.register([
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
]);

const TreeStatistics: React.FC<TreeStatisticsProps> = ({ tree }) => {
  const [date, setDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });

  const setPrevMonth = (date: Date) => {
    const copiedDate = getCopiedDate(date);
    copiedDate.setMonth(copiedDate.getMonth() - 1);
    setDate(copiedDate);
  };

  const setNextMonth = (date: Date) => {
    const copiedDate = getCopiedDate(date);
    copiedDate.setMonth(copiedDate.getMonth() + 1);
    setDate(copiedDate);
  };

  const daysCount = getDaysInMonth(date.getMonth(), date.getFullYear());

  const increments = useTreeIncrements(tree?.increments, date);

  const lineChartOptions = {
    aspectRatio: 2.25,
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        min: 0,
        max: daysCount,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const lineChartData = {
    labels: Object.keys(increments.all),
    datasets: [
      {
        backgroundColor: "rgba(111, 163, 194, 0.25)",
        borderColor: "rgba(111, 163, 194, 1)",
        data: Object.values(increments.all),
        fill: true,
        label: "Инкрементации",
        lineTension: 0.4,
      },
    ],
  };

  const barChartOptions = {
    aspectRatio: 2.25,
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barChartData = {
    labels: Object.keys(increments.weekdays).map((_value, i) =>
      getWeekdayName(i, true)
    ),
    datasets: [
      {
        backgroundColor: [
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(111, 163, 194, 0.25)",
          "rgba(209, 79, 80, 0.25)",
          "rgba(209, 79, 80, 0.25)",
        ],
        hoverBackgroundColor: [
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(209, 79, 80, 1)",
          "rgba(209, 79, 80, 1)",
        ],
        borderWidth: 2,
        borderColor: [
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(111, 163, 194, 1)",
          "rgba(209, 79, 80, 1)",
          "rgba(209, 79, 80, 1)",
        ],
        data: Object.values(increments.weekdays),
        fill: true,
        label: "Инкрементации",
        lineTension: 0.4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieChartData = {
    labels: ["Без инкрементации", "С инкрементацией"],
    datasets: [
      {
        data: [daysCount - increments.daysCount, increments.daysCount],
        label: "Дни",
        backgroundColor: ["rgba(209, 79, 80, 0.75)", "rgba(89, 124, 99, 0.75)"],
        hoverBackgroundColor: ["rgba(209, 79, 80, 1)", "rgba(89, 124, 99, 1)"],
        borderWidth: 2,
        borderColor: "#fee8d4",
        tension: 100,
      },
    ],
  };

  const bubbleChartOptions = {
    aspectRatio: 2.25,
    scales: {
      x: {
        min: 1,
        max: daysCount,
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        min: 0,
        max: 24,
        ticks: {
          stepSize: 3,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const bubbleChartData = {
    labels: Object.keys(increments.all),
    datasets: [
      {
        backgroundColor: "rgba(111, 163, 194, 0.25)",
        borderColor: "rgba(111, 163, 194, 1)",
        data: increments.hours,
        label: "",
      },
    ],
  };

  return (
    <>
      <TitleComponent level="2" color="light">
        Статистика дерева
      </TitleComponent>
      <div className="w-full flex justify-end mb-4 grow">
        <div className="flex items-center gap-4 grow justify-between lg:justify-end">
          <div className="text-lg">
            {getMonthName(date.getMonth())[0]} {date.getFullYear()}
          </div>
          <div className="flex items-center justify-between gap-6 lg:gap-2">
            <div
              onClick={() => setPrevMonth(date)}
              className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main"
            >
              <Arrow />
            </div>
            <div
              onClick={() => setNextMonth(date)}
              className="cursor-pointer flex items-center p-1 transition-colors duration-150 hover:text-main -scale-x-100"
            >
              <Arrow />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-[calc(50%-1.5rem)]">
            <TitleComponent level="4" color="light">
              По дням
            </TitleComponent>
            <Line options={lineChartOptions} data={lineChartData} />
          </div>
          <div className="w-full lg:w-[calc(50%-1.5rem)]">
            <TitleComponent level="4" color="light">
              По дням недели
            </TitleComponent>
            <Bar options={barChartOptions} data={barChartData} />
          </div>
        </div>

        <div className="flex justify-between gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-[calc(50%-1.5rem)]">
            <TitleComponent level="4" color="light">
              По часам
            </TitleComponent>
            <Bubble options={bubbleChartOptions} data={bubbleChartData} />
          </div>

          <div className="w-full lg:w-[calc(50%-1.5rem)] flex flex-col items-center">
            <TitleComponent level="4" color="light">
              По активности
            </TitleComponent>
            <div className="grow flex items-center">
              <div className="h-[250px] py-2">
                <Pie options={pieChartOptions} data={pieChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TreeStatistics;
