import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from "@faker-js/faker";
import sort from '../utils/init_sort';
import { TOP_100_BALANCES } from '../utils/queries';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'ALCX Reactor Top Balances',
    },
  },
};

const labels = ['0x0', '0x1', '0x2'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Balance in ALCX',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function App() {
  const [barData, setBarData] = useState(data);
  
  const fetchSortData = async () => {
    const balances = await sort.query(TOP_100_BALANCES);
    console.log(balances);

    const newLabels = balances.map((balance: any) => balance.transaction_from);

    console.log("newLabels", newLabels);
    

    const newData = {
      labels: newLabels,
      datasets: [
        {
          label: 'Balance in ALCX',
          data: newLabels.map((label: string) => {
            // find the balance for this label
            const balance = balances.find((balance: any) => balance.transaction_from === label);
            console.log("balance", balance);

            return balance.balance || 0;
          }),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    setBarData(newData);
  }

  useEffect(() => {
    fetchSortData();
  }, []);
  
  return <Bar options={options} data={barData} />;
}
