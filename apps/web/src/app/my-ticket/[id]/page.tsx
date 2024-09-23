'use client';
import { useEffect, useState } from 'react';
import { getToken } from '@/lib/server';
import { DecodedToken, TicketDetails } from '@/type/user';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { getTicketId } from '@/lib/ticket';
import moment from 'moment';
import afgan from '@/assets/afgan.png';
import Image from 'next/image';
import { event } from 'cypress/types/jquery';

const TicketDetailsPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch ticket details by ID
        const { result, ok } = await getTicketId(userId, Number(params.id));

        if (ok) {
          console.log('Ticket data:', result.ticket); // Debug log
          setData(result.ticket);
        } else {
          setError(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!data) return <p className="text-white text-center">No ticket found</p>;

  const formatPrice = (price: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(price)}`;
  };

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
    <section className="relative w-full flex flex-col items-center py-2 md:py-5 lg:py-10 px-4 md:px-8 lg:px-16 bg-black text-white">
      <div className="w-full max-w-4xl bg-black text-white shadow-xl rounded-lg p-6 md:p-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center mb-6">Ticket Details</h1>
        <div className="border-t border-gray-700 mb-6"></div>
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="flex justify-center mb-6 md:mb-0">
            <div className="relative w-full max-w-xs md:w-80 md:max-w-full h-80">
              <Image
                src={data.event.image || afgan}
                alt="Event Image"
                layout="fill"
                className="object-cover rounded-md"
              />
            </div>
          </div>

          <div className="md:w-2/3 md:pl-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Event Name</h2>
              <div className="bg-gray-800 text-gray-200 rounded-md px-4 py-2">
                {data.event.name || 'No name available'}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Location</h2>
              <div className="bg-gray-800 text-gray-200 rounded-md px-4 py-2">
                {data.event.location || 'No location available'}
              </div>
            </div>

            <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <h2 className="text-lg font-semibold">Date</h2>
                <div className="bg-gray-800 text-gray-200 rounded-md px-4 py-2">
                  {formatDate(data?.event.eventDate) || 'No date available'}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Time</h2>
                <div className="bg-gray-800 text-gray-200 rounded-md px-4 py-2">
                  {formatTime24Hour(data?.event.eventDate) || 'No time available'}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Ticket Price</h2>
              <div className="bg-gray-800 text-gray-200 rounded-md px-4 py-2">
                {data?.event.price ? formatPrice(data.event?.price) : 'No price available'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Link href="/my-ticket">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 transition"
            >
              OK
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TicketDetailsPage;
