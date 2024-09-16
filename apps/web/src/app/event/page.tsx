'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        // Adjust the endpoint URL based on your API setup
        const response = await fetch('http://localhost:8000/api/event'); 

        // Check if response is okay
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        // Ensure data.event exists and is an array
        if (!data.event || !Array.isArray(data.event)) {
          throw new Error('Invalid events data');
        }

        setEvents(data.event); // Set the events state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events'); // Set the error state
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


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
              <Link href={`/event/${event.id}`}>
            
                  <Image
                    src={event.image}
                    alt={event.name}
                    width={450}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
             
              </Link>
              {/* Other event details */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Event;
