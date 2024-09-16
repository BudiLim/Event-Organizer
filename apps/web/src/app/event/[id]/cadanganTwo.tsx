'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

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

const EventDetail = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState<Event | null>(null); // State with Event type or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!id || isNaN(Number(id))) {
          throw new Error('Invalid event ID');
        }

        const response = await fetch(`http://localhost:8000/api/event/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        console.log('Fetched event data:', data); // Log data for debugging

        if (!data.event) {
          throw new Error('Event not found');
        }

        setEvent(data.event);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to load event details');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  if (!event) return <div>No event found</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{event.name}</h1>
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6">
        <div className="flex-shrink-0">
          <Image
            src={event.image}
            alt={event.name}
            width={450}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg mb-4"
          />
        </div>
        <div className="flex-grow ml-4">
          <p className="text-lg mb-2"><strong>Description:</strong> {event.description}</p>
          <p className="text-lg mb-2"><strong>Location:</strong> {event.location}</p>
          <p className="text-lg mb-2"><strong>Date:</strong> {event.date}</p>
          <p className="text-lg mb-2"><strong>Time:</strong> {event.time}</p>
          <p className="text-lg mb-2"><strong>Available Seats:</strong> {event.availableSeats}</p>
          <p className="text-lg mb-2"><strong>Organizer:</strong> {event.organizer.name}</p>
          <p className="text-lg mb-2"><strong>Price:</strong> {event.isPaidEvent === 'Paid' ? `Rp. ${(event.availableSeats * 100).toLocaleString('id-ID')},-` : 'Free'}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
