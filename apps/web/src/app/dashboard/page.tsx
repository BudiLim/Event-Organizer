import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Name</h1>
        <p className="text-lg">My Dashboard</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-300 p-4 rounded-lg">
          <p className="text-sm font-bold">Total Revenue</p>
          <p className="text-sm text-gray-500">Jun - Sep 2024</p>
          <p className="text-2xl font-semibold">Rp. 46.450.000,-</p>
          <p className="text-green-500 text-sm">▲ 38.87% from last week</p>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg">
          <p className="text-sm font-bold">Ticket Sold</p>
          <p className="text-sm text-gray-500">Jun - Sep 2024</p>
          <p className="text-2xl font-semibold">78</p>
          <p className="text-red-500 text-sm">▼ 15.34% from last week</p>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg">
          <p className="text-sm font-bold">Orders</p>
          <p className="text-sm text-gray-500">Jun - Sep 2024</p>
          <p className="text-2xl font-semibold">45</p>
          <p className="text-green-500 text-sm">▲ 38.87% from last week</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Report Statistics</h2>
        {/* Chart component will go here in future */}
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Chart will go here</p>
        </div>
      </div>

      {/* Event Table */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Event List</h2>
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Seat Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">Afgan Comeback</td>
              <td className="border px-4 py-2">Jakarta</td>
              <td className="border px-4 py-2">50 / 100</td>
            </tr>
            <tr className="text-center">
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">Ed Sheeran Live In Bandung</td>
              <td className="border px-4 py-2">Bandung</td>
              <td className="border px-4 py-2">65 / 100</td>
            </tr>
            <tr className="text-center">
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">Rizky Febian BD Love Story</td>
              <td className="border px-4 py-2">Bandung</td>
              <td className="border px-4 py-2">120 / 200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
