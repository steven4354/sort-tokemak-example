import { mapMonthToNumber, monthNames } from "../utils/functions";
import sort from "../utils/init_sort";
import { DEPOSITS_BY_MONTH, WITHDRAWS_BY_MONTH } from "../utils/queries";
import { faker } from "@faker-js/faker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CopyBlock, dracula } from "react-code-blocks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "ALCX Reactor - in ALCX",
    },
  },
};

const labels = monthNames;

export const data = {
  labels,
  datasets: [
    {
      label: "Withdrawals",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Deposits",
      data: labels.map((label) => {
        const index = mapMonthToNumber(label);

        return faker.datatype.number({ min: 0, max: 1000 });
      }),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function App() {
  const [barData, setBarData] = useState(data);

  const fetchSortData = async () => {
    const deposits = await sort.query(DEPOSITS_BY_MONTH);
    console.log(deposits);

    const withdrawals = await sort.query(WITHDRAWS_BY_MONTH);
    console.log(withdrawals);

    const newData = {
      labels,
      datasets: [
        {
          label: "Withdrawals",
          data: labels.map((label) => {
            const month = mapMonthToNumber(label);
            return withdrawals.filter((obj: any ) => obj.transaction_month === month).map((obj: any) => obj.total_sum)[0] 
          }),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Deposits",
          data: labels.map((label) => {
            const month = mapMonthToNumber(label);
            return deposits.filter((obj: any ) => obj.transaction_month === month).map((obj: any) => obj.total_sum)[0] 
          }),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    setBarData(newData);
  };

  useEffect(() => {
    fetchSortData();
  }, []);

  return <>
    <Bar options={options} data={barData} />
    <div>
      <CopyBlock
        language="js"
        text={`
// No API Key Required:
// - Call directly from client side javascript / hosted anywhere (IPFS, etc.)
// - Let anyone in the community use the API to build their own front-ends, all free

// Deposits
let deposits_result = await sort.query("`+DEPOSITS_BY_MONTH+`");

// Withdrawals
let withdrawals_result = await sort.query("`+WITHDRAWS_BY_MONTH+`");
        `}
        codeBlock
        theme={dracula}
        showLineNumbers={false}
        />
    </div>
  </>;
}
