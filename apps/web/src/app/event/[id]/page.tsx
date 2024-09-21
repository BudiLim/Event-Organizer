'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { useParams } from 'next/navigation';
import { createTicket } from '@/lib/ticket';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Event } from '@/type/user';

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
  const [value, setValue] = useState<number>(50); // Slider value

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
        `http://localhost:8000/api/promotion/discount-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ discountCode, eventId: event?.id }),
        },
      );

      const result = await response.json();

      if (response.ok && result.discount) {
        setDiscountAmount(result.discount.percentage);
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
    const totalAmountBeforeDiscount = ticketPrice * ticketCount;
    const discountAmountInCurrency =
      (totalAmountBeforeDiscount * discountAmount) / 100;
    const finalAmount = totalAmountBeforeDiscount - discountAmountInCurrency;
    const totalPrice = finalAmount < 0 ? 0 : finalAmount;
    const singleDiscount = (event.price * discountAmount) / 100;
    const singlePrice = event.price - singleDiscount;

    try {
      setIsCreatingTicket(true);
      const { result, ok } = await createTicket(
        event.id,
        singlePrice,
        ticketCount,
        totalPrice,
        discountCode,
      );

      if (ok) {
        setTicketSuccess('Ticket created successfully!');
        toast.success('Ticket created successfully!');
      } else {
        setTicketError(result?.message || 'Failed! Voucher may be invalid or expired');
        toast.error(result?.message || 'Failed! Voucher may be invalid or expired');
      }
    } catch (error) {
      setTicketError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const handlePurchase = async () => {
    await applyDiscount(); // Apply discount first
    handleTicketCreation(); // Then create ticket
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value)); // Handle slider value
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!event) return <p>No event data</p>;

  const formatDate = (dateString: string) => {
    return moment(dateString).format('DD MMMM YYYY');
  };

  const formatTime24Hour = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const ticketPrice = event?.isPaidEvent === 'Paid' ? event.price : 0;
  const totalAmountBeforeDiscount = ticketPrice * ticketCount;
  const discountAmountInCurrency =
    (totalAmountBeforeDiscount * discountAmount) / 100;
  const finalAmount = totalAmountBeforeDiscount - discountAmountInCurrency;
  const totalPrice = finalAmount < 0 ? 0 : finalAmount;

  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
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
              <h1 className="font-semibold">Category</h1>
              <p className="text-[#d9d9d9]">{event.category.toLowerCase()}</p>
            </div>
            <div className="text-extrathin text-lg">
              <h1 className="font-semibold">General Admission</h1>
              <div className="flex justify-between w-full">
                <h1>
                  Rp.{' '}{(event.price > 0 ? totalPrice : 0).toLocaleString('id-ID')},-
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
            <div className="text-extrathin text-lg">
              <h1 className="font-semibold">Use Point</h1>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={handleSliderChange}
                  className="w-full"
                />
                <span className="text-white">{value}%</span>
              </div>
            </div>
          </div>
          <button
            className="bg-white text-black px-4 py-2 rounded-lg"
            onClick={handlePurchase}
            disabled={isCreatingTicket}
          >
            {isCreatingTicket ? 'Processing...' : 'Buy Ticket'}
          </button>
          {ticketError && (
            <p className="text-red-500">{ticketError}</p>
          )}
          {ticketSuccess && (
            <p className="text-green-500">{ticketSuccess}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
