'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the type for dashboard data
interface DashboardData {
  fullName: string;
  totalRevenue: number;
  totalOrders: number;
  events: Array<{
    id: number;
    name: string;
    location: string;
    availableSeats: number;
  }>;
}

// Define the type for component props
interface DashboardProps {
  organizerId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ organizerId }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  ); // State for fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/dashboard/${organizerId}`,
          { withCredentials: true }, // Include cookies with the request
        );
        setDashboardData(response.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizerId]);

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>{error}</p>;

  // Render the dashboard data if available
  return (
    <div className="dashboard">
      {dashboardData ? (
        <>
          <h1>{dashboardData.fullName}'s Dashboard</h1>
          <div>Total Revenue: {dashboardData.totalRevenue}</div>
          <div>Total Orders: {dashboardData.totalOrders}</div>
          {/* Display events */}
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Event Name</th>
                <th>Location</th>
                <th>Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.events.map((event, index) => (
                <tr key={event.id}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.location}</td>
                  <td>{event.availableSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Dashboard;
