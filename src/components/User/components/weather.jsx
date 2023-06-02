import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  function Chart({hourlyData}) {  
console.log("hourlyData")
console.log(hourlyData)
    const labels = hourlyData.hourly.time;
    const temperatureData = hourlyData.hourly.temperature_2m;
    const humidityData = hourlyData.hourly.relativehumidity_2m;
    const windSpeedData = hourlyData.hourly.windspeed_10m;

const data = {
  labels: labels,
  datasets: [
    {
      label: 'temperature',
      data: temperatureData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'humidity',
      data: humidityData,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'windSpeed',
      data: windSpeedData,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


  return <Line options={options} data={data} />;
}

export default Chart;
