'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { createTicket } from '@/lib/ticket';
import moment from 'moment';
import { toast } from 'react-toastify';

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  eventDate: string;
  eventTime: string;
  sellEndDate: string;
  sellEndTime: string;
  price: number;
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
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isDiscountValid, setIsDiscountValid] = useState<boolean | null>(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

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
    if (ticketCount < 100) setTicketCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (ticketCount > 1) setTicketCount((prev) => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(100, Number(e.target.value) || 1));
    setTicketCount(value);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = async () => {
    if (!discountCode) return;
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/promotion`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ discountCode, eventId: event?.id }),
        }
      );
  
      const result = await response.json();
      if (response.ok && result.discount) {
        setDiscountAmount(result.discount.amount);
        setIsDiscountValid(true);
      } else {
        setIsDiscountValid(false);
        setDiscountAmount(0);
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      setIsDiscountValid(false);
    }
  };
  

  const handleTicketCreation = async () => {
    if (!event) return;

    const ticketPrice = event?.isPaidEvent === 'Paid' ? event.price : 0;
    const totalAmount = ticketPrice * ticketCount - discountAmount; // Calculate total amount

    // Ensure totalAmount isn't negative (if discount is greater than ticket price)
    const finalAmount = totalAmount < 0 ? 0 : totalAmount;

    setIsCreatingTicket(true);
    setTicketError(null);
    setTicketSuccess(null);

    try {
      const { result, ok } = await createTicket(
        event.id,
        ticketPrice,
        ticketCount,
        finalAmount,
        discountCode,
      );

      if (ok) {
        toast.success('Ticket created successfully!');
        // Handle further actions after successful ticket creation
      } else {
        toast.error(result?.message || 'Failed to create ticket');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const ticketPrice = event?.isPaidEvent === 'Paid' ? event.price : 0;
  const totalPrice = ticketPrice * ticketCount - discountAmount;

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!event) return <p>No event data</p>;

  const formatDate = (dateString: string) => {
    return moment(dateString).format('DD MMMM YYYY'); // Formats the date
  };
  const formatTime24Hour = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div className='flex justify-center items-center  w-full h-min-screen'>
      <div className='flex justify-center bg-black rounded-lg px-[300px] gap-[80px] p-4'>
        <div className='shadow-sm shadow-white rounded-lg'>
          {event.image ? (
            <Image
              src={event.image}
              alt="Event Image"
              width={450}
              height={300}
            />
          ) : (
            <div className="w-450 h-300 bg-gray-500 flex items-center justify-center text-white">
              No Image Available
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between text-white gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <div className="text-extrathin text-lg">
              <h1 className="font-semibold">Date & Time</h1>
              <p className="text-[#d9d9d9]">
                {formatDate(event.eventDate) || 'No date available'} |{' '}
                {formatTime24Hour(event.eventDate)}
              </p>
            </div>
            <div className="text-extrathin text-lg">
              <h1 className="font-semibold">Location</h1>
              <p className="text-[#d9d9d9]">{event.location}</p>
            </div>
            <div className="text-extrathin text-lg">
              <h1 className="font-semibold">Organized By</h1>
              <p className="text-[#d9d9d9]">{event.organizer.name}</p>
            </div>
            <div className="text-extrathin text-lg">
              <h1 className="font-semibold">General Admission</h1>
              <div className="flex justify-between w-full">
                <h1>
                  Rp.{' '}
                  {(event.price > 0 ? totalPrice : 0).toLocaleString('id-ID')},-
                </h1>
                <div className="flex items-center gap-3">
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
            <div className="flex flex-col gap-2 text-white font-normal">
              <h1>Discount Voucher</h1>
              <input
                type="text"
                placeholder="Discount Code Here . . ."
                value={discountCode}
                onChange={handleDiscountChange}
                className="input input-bordered bg-slate-800"
              />
              <button
                onClick={applyDiscount}
                className="bg-blue-700 p-2 rounded-lg mt-2"
              >
                Apply Discount
              </button>
              {isDiscountValid === false && (
                <p className="text-red-500">Invalid Discount Code</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="font-bold">
              Total: Rp.{' '}
              {(event.price > 0 ? totalPrice : 0).toLocaleString('id-ID')},-
            </h1>
            <button
              onClick={handleTicketCreation}
              disabled={isCreatingTicket}
              className="bg-blue-700 p-2 rounded-lg"
            >
              {isCreatingTicket ? 'Processing...' : 'Check Out'}
            </button>
            {ticketError && <p className="text-red-500">{ticketError}</p>}
            {ticketSuccess && <p className="text-green-500">{ticketSuccess}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
