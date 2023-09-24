'use client';

import React from 'react';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
} from 'chart.js';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import withAuth from '@/lib/withAuth';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { OrderSchemaData } from './orders/page';
import Loading from '@/components/Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// const barChartOptions_1 = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//       align: 'end' as const,
//       labels: {
//         boxWidth: 7,
//         usePointStyle: true,
//         pointStyle: 'circle',
//       },
//     },
//     title: {
//       text: 'Penjualan Report',
//       display: true,
//       color: 'rgba(0, 0, 0, 1)',
//       font: {
//         size: 18,
//       },
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

// const barChartData_1 = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'Brutto',
//       data: [330, 220, 175, 200, 400, 360, 310],
//       backgroundColor: 'rgba(100, 200, 100, 1)',
//       barThickness: 10,
//     },
//     {
//       label: 'Netto',
//       data: [200, 400, 320, 175, 500, 300, 200],
//       backgroundColor: 'rgba(53, 162, 235, 1)',
//       barThickness: 10,
//     },
//   ],
// };

const lineChartOptions_1 = {
  // responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0,
      borderWidth: 2,
      borderColor: 'rgba(50, 200, 100, 1)',
      fill: 'start',
      backgroundColor: 'rgba(50, 200, 100, 0.2)',
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const lineChartData_1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [230, 100, 75, 200, 400, 300, 600],
    },
  ],
};

const lineChartOptions_2 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0,
      borderWidth: 2,
      borderColor: 'rgba(200, 190, 100, 1)',
      fill: 'start',
      backgroundColor: 'rgba(200, 190, 100, 0.2)',
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const lineChartData_2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [600, 450, 375, 450, 400, 300, 250],
    },
  ],
};
const lineChartOptions_3 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0,
      borderWidth: 2,
      borderColor: 'rgba(100, 190, 200, 1)',
      fill: 'start',
      backgroundColor: 'rgba(100, 190, 200, 0.2)',
    },
    point: {
      radius: 0,
      hitRadius: 0,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const lineChartData_3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      data: [330, 100, 75, 200, 400, 300, 310],
    },
  ],
};

// const barChartOptions_1 = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//       align: 'end' as const,
//       labels: {
//         boxWidth: 7,
//         usePointStyle: true,
//         pointStyle: 'circle',
//       },
//     },
//     title: {
//       text: 'Penjualan Report',
//       display: true,
//       color: 'rgba(0, 0, 0, 1)',
//       font: {
//         size: 18,
//       },
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false,
//       },
//     },
//   },
// };

const AdminPage = () => {
  //use Query
  const { data: OrderData, isLoading } = useQuery<OrderSchemaData>(['/order']);

  // Get categories
  const categoryData = OrderData?.data.map((data) => data.category);
  // Count categories
  function countCategories(categoryData: any[]): number[] {
    const counts: { [key: string]: number } = {};

    isLoading
      ? null
      : categoryData.forEach((category: string) => {
          counts[category] = (counts[category] || 0) + 1;
        });

    // Convert counts to an array of values
    const countsArray = Object.values(counts);

    return countsArray;
  }

  // Get status
  const statusData = OrderData?.data.map((data) => data.status);
  // Count Status
  function countStatus(statusData: any[]): number[] {
    const counts: { [key: string]: number } = {};
    statusData;
    isLoading
      ? null
      : statusData.forEach((status: string) => {
          counts[status] = (counts[status] || 0) + 1;
        });

    // Convert counts to an array of values
    const countsArray = Object.values(counts);

    return countsArray;
  }

  // Assuming you have the 'categoryData' array as you mentioned.
  const counts = countCategories(categoryData as any);
  const countStatusData = countStatus(statusData as any);

  const salesStatusData = {
    labels: ['Ditolak', 'Pending', 'Diterima'],
    datasets: [
      {
        label: 'Jumlah Penjualan per Kategori',
        data: countStatusData,
        backgroundColor: [
          'rgba(46, 204, 113, 0.2)',
          'rgba(242, 120, 75, 0.2)',
          'rgba(138, 43, 226, 0.2)',
        ],
        borderColor: [
          'rgba(46, 204, 113, 1)',
          'rgba(242, 120, 75, 1)',
          'rgba(138, 43, 226, 1)',
        ],
        barThickness: 10,
      },
    ],
  };

  const salesPerCategoryData = {
    labels: ['Bantal', 'Boneka', 'Lainnya'],
    datasets: [
      {
        label: 'Jumlah Penjualan per Kategori',
        data: counts,
        backgroundColor: [
          'rgba(48, 86, 162, 0.2)',
          'rgba(225, 71, 71, 0.2)',
          'rgba(255, 215, 93, 0.2)',
        ],
        borderColor: [
          'rgba(48, 86, 162, 1)',
          'rgba(225, 71, 71, 1)',
          'rgba(255, 215, 93, 1)',
        ],
        barThickness: 10,
      },
    ],
  };

  const salesPerCategoryDataOptionPie = {
    elements: {
      arc: {
        weight: 0.5,
        borderWidth: 3,
      },
    },
    cutout: 150,
  };

  return (
    <DashboardLayout>
      {!isLoading ? (
        <div className='flex flex-col m-6 gap-4'>
          <div className='flex flex-wrap flex-row gap-6'>
            {/* 1st Line Chart Start */}
            <div className='relative md:max-w-[360px] w-full flex flex-row p-4 rounded-lg items-center bg-white'>
              <div className='flex flex-col text-slate-500'>
                <h3 className='text-base sm:text-lg font-medium'>Engagement</h3>
                <p className='text-xl sm:tefxt-2xl text-black font-semibold'>
                  16003
                </p>
                <p className='flex flex-row items-center text-sm sm:text-base text-green-500 font-semibold'>
                  {((lineChartData_1.datasets[0].data[
                    lineChartData_1.datasets[0].data.length - 1
                  ] -
                    lineChartData_1.datasets[0].data[
                      lineChartData_1.datasets[0].data.length - 2
                    ]) /
                    lineChartData_1.datasets[0].data[
                      lineChartData_1.datasets[0].data.length - 2
                    ]) *
                    100}
                  % <BsArrowUp className='w-4 h-4 text-green-500' />
                  <span className='text-xs text-slate-400 font-medium mt-1'>
                    than last month
                  </span>
                </p>
              </div>
              <div className='absolute right-0 sm:right-4 w-[60%] xs:w-[20%] sm:w-[40%] md:w-[60%] h-24'>
                <Line
                  options={lineChartOptions_1}
                  data={lineChartData_1}
                  width={200}
                  height={100}
                />
              </div>
            </div>
            {/* 1st Line Chart End */}
            {/* 2nd Line Chart Start */}
            <div className='relative md:max-w-[360px] w-full flex flex-row p-4 rounded-lg items-center bg-white'>
              <div className='flex flex-col text-slate-500'>
                <h3 className='text-base sm:text-lg font-medium'>Impression</h3>
                <p className='text-xl sm:text-2xl text-black font-semibold'>
                  2640
                </p>
                <p className='flex flex-row items-center text-sm sm:text-base text-red-500 font-semibold'>
                  {(
                    ((lineChartData_2.datasets[0].data[
                      lineChartData_2.datasets[0].data.length - 1
                    ] -
                      lineChartData_2.datasets[0].data[
                        lineChartData_2.datasets[0].data.length - 2
                      ]) /
                      lineChartData_2.datasets[0].data[
                        lineChartData_2.datasets[0].data.length - 2
                      ]) *
                    100
                  ).toFixed(1)}
                  % <BsArrowDown className='w-4 h-4 text-red-500' />
                  <span className='text-xs text-slate-400 font-medium mt-1'>
                    than last month
                  </span>
                </p>
              </div>
              <div className='absolute right-0 sm:right-4 w-[60%] xs:w-[20%] sm:w-[40%] md:w-[60%] h-24'>
                <Line
                  options={lineChartOptions_2}
                  data={lineChartData_2}
                  width={200}
                  height={100}
                />
              </div>
            </div>
            {/* 2nd Line Chart End */}
            {/* 3rd Line Chart Start */}
            <div className='relative md:max-w-[360px] w-full flex flex-row p-4 rounded-lg items-center bg-white'>
              <div className='flex flex-col text-slate-500'>
                <h3 className='text-base sm:text-lg font-medium'>
                  Rata2 Posisi
                </h3>
                <p className='text-xl sm:text-2xl text-black font-semibold'>
                  13.4
                </p>
                <p className='flex flex-row items-center text-sm sm:text-base text-green-500 font-semibold'>
                  {(
                    ((lineChartData_3.datasets[0].data[
                      lineChartData_3.datasets[0].data.length - 1
                    ] -
                      lineChartData_3.datasets[0].data[
                        lineChartData_3.datasets[0].data.length - 2
                      ]) /
                      lineChartData_3.datasets[0].data[
                        lineChartData_3.datasets[0].data.length - 2
                      ]) *
                    100
                  ).toFixed(1)}
                  % <BsArrowUp className='w-4 h-4 text-green-500' />
                  <span className='text-xs text-slate-400 font-medium mt-1'>
                    than last month
                  </span>
                </p>
              </div>
              <div className='absolute right-0 sm:right-4 w-[60%] xs:w-[20%] sm:w-[40%] md:w-[60%] h-24'>
                <Line
                  options={lineChartOptions_3}
                  data={lineChartData_3}
                  width={200}
                  height={100}
                />
              </div>
            </div>
            {/* 3rd Line Chart End */}
          </div>{' '}
          <div className='bg-white'>
            <div className='w-[400px] xl:w-[600px] p-4 flex flex-col lg:flex-row gap-8'>
              <p className='font-bold'>Pernjualan per Kategori</p>
              <Pie
                data={salesPerCategoryData}
                width={100}
                options={salesPerCategoryDataOptionPie}
              />
              {/* Status */}

              <p className='font-bold'>Status Pemesanan</p>
              <Pie
                data={salesStatusData}
                width={100}
                options={salesPerCategoryDataOptionPie}
              />
              {/* <Bar options={barChartOptions_1} data={salesPerCategoryData} /> */}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </DashboardLayout>
  );
};

export default withAuth(AdminPage);
