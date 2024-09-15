'use client'
import React, { useEffect, useState } from 'react';

// Define the Event type
interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image: string;
  availableSeats: number;
  isPaidEvent: string;
  organizer: {
    id: number;
    name: string;
  };
}

const Event = () => {
  const [events, setEvents] = useState<Event[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/create-event');
        
        // Check if response is okay
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        // Ensure data.events exists and is an array
        if (!data.events || !Array.isArray(data.events)) {
          throw new Error('Invalid events data');
        }

        setEvents(data.events); // Set the events state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events'); // Set the error state
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-6">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Time:</span> {new Date(event.time).toLocaleTimeString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Available Seats:</span> {event.availableSeats}
              </p>
              <p className={`mt-4 ${event.isPaidEvent === 'Paid' ? 'text-red-500' : 'text-green-500'}`}>
                {event.isPaidEvent === 'Paid' ? 'Paid Event' : 'Free Event'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;
