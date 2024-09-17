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
  eventDate: string;
  eventTime: string;
  sellEndDate: string;
  sellEndTime: string;
  image: string;
  price: number;
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
    <div className="container mx-auto px-4 py-2 md:py-4 lg:py-6 h-min-screen">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center pb-2 md:pb-4 lg:pb-6 text-white">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-9">
          {events.map((event) => (
            <div key={event.id} className="bg-black shadow-white shadow-md rounded-lg p-2 md:p-4 lg:p-6">
              <Link href={`/event/${event.id}`}>
                <Image
                  src={event.image}
                  alt={event.name}
                  width={300}
                  height={450}
                  className="w-full  object-cover rounded-t-lg mb-4"
                />
                <div className='flex flex-col gap-1 text-center text-white text-lg md:text-xl lg:text-2xl'>
                  <h2 className='font-bold'>{event.name}</h2>
                  <h2 className='font-medium'>{event.isPaidEvent}</h2>
                </div>

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
