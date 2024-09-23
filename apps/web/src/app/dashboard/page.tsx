'use client';
import { getOrganizerDashboardData } from '@/lib/dashboard';
import { getToken } from '@/lib/server';
import { DashboardData, DecodedToken } from '@/type/user';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import MyLineChart from '@/app/chart/page';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (!token) {
        setError('Token is missing');
        setLoading(false);
        return;
      }

      try {
        // Decode the token to extract organizerId
        const decodedToken: DecodedToken = jwtDecode(token);
        const organizerId = decodedToken.id;

        const { result, ok } = await getOrganizerDashboardData(organizerId);

        if (ok) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 'N/A';
    const change = ((current - previous) / previous) * 100;
    return `${change.toFixed(2)}%`;
  };

  const getChangeIndicator = (current: number, previous: number) => {
    if (current > previous) return '▲';
    if (current < previous) return '▼';
    return '-';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const revenueChange = calculatePercentageChange(
    data.totalRevenue,
    data.previousWeekRevenue,
  );
  const ticketsChange = calculatePercentageChange(
    data.totalTicketsSold,
    data.previousWeekTicketsSold,
  );

  // Dynamic Chart Data
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const labels = monthNames; // This will use all months

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: new Array(12).fill(0).map((_, index) => {
          const monthData = data.monthlyRevenue.find(
            (item) => item.month === index + 1,
          );
          return monthData ? monthData.revenue : 0;
        }),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2,
      },
    ],
  };

  const maxRevenue = Math.max(...chartData.datasets[0].data);
  const gap = maxRevenue * 0.25; // 25% of the maximum revenue

  const chartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Revenue (in IDR)',
        },
        beginAtZero: true,
        suggestedMin: 0, // You can also set this to a specific value if needed
        suggestedMax: maxRevenue + gap, // Add 25% gap to the maximum value
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">{data.fullName}</h1>
        <p className="text-3xl">My Dashboard</p>
      </header>
      <div className="border border-slate-400" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pt-5">
        <div className="bg-gray-300 p-4 rounded-lg">
          <p className="text-sm font-bold pb-2 text-center">Total Revenue</p>
          <p className="text-2xl font-semibold pb-2 text-center">
            Rp. {data.totalRevenue.toLocaleString('id-ID')}
          </p>
          <p
            className={
              data.totalRevenue > data.previousWeekRevenue
                ? 'text-green-500 text-sm text-center'
                : 'text-red-500 text-sm text-center'
            }
          >
            {getChangeIndicator(data.totalRevenue, data.previousWeekRevenue)}{' '}
            {revenueChange} from last week
          </p>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg">
          <p className="text-sm font-bold pb-2 text-center">Tickets Sold</p>
          <p className="text-2xl font-semibold pb-2 text-center">
            {data.totalTicketsSold}
          </p>
          <p
            className={
              data.totalTicketsSold > data.previousWeekTicketsSold
                ? 'text-green-500 text-sm text-center'
                : 'text-red-500 text-sm text-center'
            }
          >
            {getChangeIndicator(
              data.totalTicketsSold,
              data.previousWeekTicketsSold,
            )}{' '}
            {ticketsChange} from last week
          </p>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg">
          <p className="text-sm font-bold pb-2 text-center">Orders</p>
          <p className="text-2xl font-semibold pb-2 text-center">
            {data.totalOrders}
          </p>
          <p
            className={
              data.totalOrders > data.previousWeekOrders
                ? 'text-green-500 text-sm text-center'
                : 'text-red-500 text-sm text-center'
            }
          >
            {getChangeIndicator(data.totalOrders, data.previousWeekOrders)}{' '}
            {ticketsChange} from last week
          </p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-bold mb-4 text-center">
          Report Statistics
        </h2>
        <div className="w-full h-64 md:h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Event List - Responsive */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Event List</h2>

        {/* Table for large screens */}
        <div className="hidden md:block">
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Event Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Ticket Type</th>
                <th className="px-4 py-2">Ticket Price</th>
                <th className="px-4 py-2">Seat Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data.events.map((event, index) => (
                <tr key={event.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{event.name}</td>
                  <td className="border px-4 py-2">{event.location}</td>
                  <td className="border px-4 py-2">{event.isPaidEvent}</td>
                  <td className="border px-4 py-2">{event.price}</td>
                  <td className="border px-4 py-2">{event.availableSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for small screens */}
        <div className="block md:hidden">
          {data.events.map((event, index) => (
            <div key={event.id} className="mb-4 border rounded-lg p-4">
              <p className="font-semibold">
                {index + 1}. {event.name}
              </p>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">Ticket Type: {event.isPaidEvent}</p>
              <p className="text-gray-600">Ticket Price: {event.price}</p>
              <p className="text-gray-600">
                Seat Quantity: {event.availableSeats}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
