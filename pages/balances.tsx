import React from 'react';
import { Bar } from 'react-chartjs-2';
import { faker } from "@faker-js/faker";

const HorizontalBarChart = () => {
  // Generate fake data using faker
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [
          faker.random.numeric(),
          faker.random.numeric(),
          faker.random.numeric(),
          faker.random.numeric(),
          faker.random.numeric(),
          faker.random.numeric(),
          faker.random.numeric(),
        ],
      },
    ],
  };

  // Customize chart options
  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Bar
      data={data}
      options={options}
      width={100}
      height={50}
      type="horizontalBar"
    />
  );
};

export default HorizontalBarChart;