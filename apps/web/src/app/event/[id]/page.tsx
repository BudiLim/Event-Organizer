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
  const [voucherCode, setVoucherCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [isDiscountValid, setIsDiscountValid] = useState<boolean | null>(null);
  const [isVoucherValid, setIsVoucherValid] = useState<boolean | null>(null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [codeType, setCodeType] = useState<'voucher' | 'discount' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event data
        const eventResponse = await fetch(
          `http://localhost:8000/api/event/${id}`,
        );
        if (!eventResponse.ok) throw new Error('Failed to fetch event');
        const eventData = await eventResponse.json();
        setEvent(eventData.event);

        // Fetch user points
        const pointsResponse = await fetch(
          `http://localhost:8000/api/user/points`,
        );
        const pointsData = await pointsResponse.json();
        setUserPoints(pointsData.points);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load event details or user points');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
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

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  };
  

  const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      0,
      Math.min(userPoints, parseInt(e.target.value) || 0),
    );
    setPointsToRedeem(value);
  };

  const applyDiscount = async () => {
    if (!discountCode || !event?.id) return;
    try {
      const response = await fetch(
        `http://localhost:8000/api/promotion/apply-discount-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ discountCode, eventId: event.id }),
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
      setDiscountAmount(0);
    }
  };

  const applyVoucher = async () => {
    if (!voucherCode || !event?.discount.userId) return;
    try {
      const response = await fetch(
        `http://localhost:8000/api/promotion/apply-voucher-code`, // Update this with the correct endpoint
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ voucherCode, userId: event.discount.userId }),
        },
      );
      const result = await response.json();
      if (response.ok && result.voucher) {
        setVoucherAmount(result.voucher.amount.percentage);
        setIsVoucherValid(true);
      } else {
        console.error('Voucher error:', result);
        setIsVoucherValid(false);
        setVoucherAmount(0);
      }
    } catch (error) {
      console.error('Error applying voucher:', error);
      setIsVoucherValid(false);
      setVoucherAmount(0);
    }
  };
  

  const handleTicketCreation = async () => {
    if (!event) return;
    const ticketPrice = event?.isPaidEvent === 'Paid' ? event.price : 0;
    const totalAmountBeforeDiscount = ticketPrice * ticketCount;
    const discountAmountInCurrency =
      (totalAmountBeforeDiscount * (discountAmount || 0)) / 100;

    const pointsValue = pointsToRedeem || 0; // Default to 0 if pointsToRedeem is falsy
    const finalAmount =
      totalAmountBeforeDiscount - discountAmountInCurrency - voucherAmount - pointsValue;
    const totalPrice = Math.max(finalAmount, 0); // Ensure no negative total price

    setIsCreatingTicket(true);
    setTicketError(null);
    setTicketSuccess(null);

    const singleDiscount = (event.price * discountAmount) / 100;
    const singlePrice = event.price - singleDiscount;

    try {
      const { result, ok } = await createTicket(
        event.id,
        singlePrice,
        ticketCount,
        totalPrice,
        discountCode,
        pointsToRedeem,
      );
      if (ok) {
        toast.success('Ticket created successfully!');
        setTicketSuccess('Ticket created successfully!');
      } else {
        toast.error(
          result?.message || 'Failed! Maybe Voucher invalid or expired',
        );
        setTicketError(
          result?.message || 'Failed! Maybe Voucher invalid or expired',
        );
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      setTicketError('An unexpected error occurred');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const handlePurchase = async () => {
    // Show confirmation popup
    const confirmed = window.confirm(
      'Are you sure you want to proceed with the purchase?',
    );

    if (!confirmed) {
      return; // User canceled, do not proceed
    }

    await applyDiscount()
    await applyVoucher();

    if (pointsToRedeem > userPoints) {
      toast.error('You do not have enough points to redeem.');
      return;
    }

    // Proceed to create the ticket
    await handleTicketCreation();
  };

  const ticketPrice = event?.isPaidEvent === 'Paid' ? event.price : 0;
  const totalAmountBeforeDiscount = ticketPrice * ticketCount;
  const discountAmountInCurrency =
    (totalAmountBeforeDiscount * discountAmount) / 10;
  const finalAmount = totalAmountBeforeDiscount - discountAmountInCurrency;
  const totalPrice = finalAmount < 0 ? 0 : finalAmount;
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
  return (
    <div className="flex justify-center items-center  w-full h-min-screen">
      <div className="flex justify-center bg-black rounded-lg px-[300px] gap-[80px] p-4">
        <div className="shadow-sm shadow-white rounded-lg">
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
              <p className="text-[#d9d9d9]">
                {event.category.toLocaleLowerCase()}
              </p>{' '}
              {/* Updated from Organizer to Category */}
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
                placeholder="Discount Code Here"
                value={(discountCode || voucherCode).toUpperCase()}
                onChange={handleDiscountChange}
                className="input input-bordered bg-slate-800"
              />
            </div>
            {/* Redeem points section */}
            <div>
              <h1 className="text-center">Redeem Point</h1>
              <input
                type="range"
                min={0}
                max={userPoints}
                value={pointsToRedeem}
                onChange={handleSlideChange}
                className="range range-primary"
              />
              <p>{pointsToRedeem} points will be redeemed</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h1 className="font-bold pr-4">
              Total: Rp.{' '}
              {(totalPrice > 0 ? totalPrice : 0).toLocaleString('id-ID')}
              ,-
            </h1>
            <button
              onClick={handlePurchase}
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
