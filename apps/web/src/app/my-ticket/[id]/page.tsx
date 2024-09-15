"use client";
import Link from 'next/link';
import Image from 'next/image';
import afgan from '@/assets/afgan.png';
import { useEffect, useState } from 'react';
import type { DecodedToken, TicketDetails } from '@/type/user';
import { getToken } from '@/lib/server';
import { getTicketId } from '@/lib/ticket';
import { jwtDecode } from 'jwt-decode';

export default function TicketDetails({ ticketId }: { ticketId: number }) {
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
        // Decode the token to get the userId
        const decodedToken: DecodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch the ticket details using both userId and ticketId
        const { result, ok } = await getTicketId(userId, ticketId);

        if (ok) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId]); // Ensure the effect runs when ticketId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No ticket found</p>;

  // Function to format price
  const formatPrice = (price: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(price)}`;
  };

  return (
    <section className="relative w-full flex justify-center items-center py-10 px-5">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Ticket Details</h1>
        {data?.tickets?.length > 0 ? (
          data.tickets.map((ticket) => (
            <div key={ticket.id}>
              <div className="border-t border-gray-300 mb-6"></div>
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
                  <div className="relative w-[300px] h-[400px]">
                    <Image
                      src={ticket.event.image || afgan}
                      alt="Event Image"
                      layout="fill"
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>

                {/* Ticket Information Section */}
                <div className="md:w-2/3 md:pl-8">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Event Name</h2>
                    <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                      {ticket.event.name}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Location</h2>
                    <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                      {ticket.event.location}
                    </div>
                  </div>

                  <div className="mb-4 flex space-x-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">Date</h2>
                      <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                        {ticket.event.eventDate}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">Time</h2>
                      <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                        {ticket.event.eventTime}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Ticket Status</h2>
                    <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                      {ticket.status}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold">Ticket Price</h2>
                    <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                      {formatPrice(ticket.price)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-2 md:px-4 py-2 md:py-4 text-center text-sm text-gray-900">
            No tickets found.
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <Link href={'/my-ticket'}>
            <button
              type="button"
              className="bg-Dark-blue text-white font-medium rounded-lg px-6 py-2.5 hover:bg-blue-800 transition"
            >
              OK
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
