'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useParams } from 'next/navigation';

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  image?: string;
  availableSeats: number;
  isPaidEvent: string;
  organizer: {
    id: number;
    name: string;
  };
}

const DetailEvent = () => {
  const { id } = useParams();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/event/${id}`);
          if (!response.ok) throw new Error('Failed to fetch event');
          const data = await response.json();
          setEvent(data.event);
        } catch (error) {
          console.error('Error fetching event:', error);
          setError('Failed to load event details');
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id]);

  const plusCount = () => {
    if (ticketCount < 100) setTicketCount(prev => prev + 1);
  };

  const minusCount = () => {
    if (ticketCount > 1) setTicketCount(prev => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, Number(e.target.value) || 1));
    setTicketCount(value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className='text-red-500 text-center'>{error}</div>;
  if (!event) return <p>No event data</p>;

  const ticketPrice = event.isPaidEvent === 'Paid' ? 500000 : 0; // Example price

  return (
    <div className='flex justify-center items-center m-8'>
      <div className='flex bg-black p-8 rounded-lg gap-[80px]'>
        <div className='shadow-sm shadow-white rounded-lg'>
          {event.image ? (
            <Image src={event.image} alt='Event Image' width={450} height={300} />
          ) : (
            <div className='w-450 h-300 bg-gray-500 flex items-center justify-center text-white'>
              No Image Available
            </div>
          )}
        </div>
        <div className='flex flex-col justify-between text-white gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>{event.name}</h1>
            <div className='text-extrathin text-lg'>
              <h1 className='font-semibold'>Date & Time</h1>
              <p className='text-[#d9d9d9]'>{event.date} | {event.time}</p>
            </div>
            <div className='text-extrathin text-lg'>
              <h1 className='font-semibold'>Location</h1>
              <p className='text-[#d9d9d9]'>{event.location}</p>
            </div>
            <div className='text-extrathin text-lg'>
              <h1 className='font-semibold'>Organized By</h1>
              <p className='text-[#d9d9d9]'>{event.organizer.name}</p>
            </div>
            <div className='text-extrathin text-lg'>
              <h1 className='font-semibold'>General Admission</h1>
              <div className='flex justify-between w-full'>
                <h1>Rp. {(ticketPrice * ticketCount).toLocaleString('id-ID')},-</h1>
                <div className='flex items-center gap-3'>
                  <FiMinusCircle onClick={minusCount} size={26} />
                  <input
                    type="number"
                    value={ticketCount}
                    onChange={handleInputChange}
                    className="w-10 text-center bg-black border border-gray-300 rounded text-white"
                  />
                  <FiPlusCircle onClick={plusCount} size={26} />
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 text-white font-normal'>
              <h1>Discount Voucher</h1>
              <input type="text" placeholder='Discount Code Here . . .' className='input input-bordered bg-slate-800' />
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'>Total : {(ticketPrice * ticketCount).toLocaleString('id-ID')},-</h1>
            <h1 className='bg-blue-700 p-2 rounded-lg'>Check Out</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
