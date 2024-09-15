'use client';
import { getMyTicketDetails } from '@/lib/ticket';
import { getToken } from '@/lib/server';
import { DecodedToken, TicketDetails } from '@/type/user';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MyTicket = () => {
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
        // Decode the token to extract userId
        const decodedToken: DecodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const { result, ok } = await getMyTicketDetails(userId);

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No ticket found</p>;

  // Function ganti angka harga
  const formatPrice = (price: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(price)}`;
  };

  return (
    <section className="relative w-full h-full flex justify-center items-center py-[78px] px-5">
      <div className="lg:w-[80%] w-full shadow-lg bg-white rounded-lg p-6">
        {/* Title */}
        <h1 className="text-[24px] md:text-[28px] text-black font-semibold mb-4 md:mb-6">
          My Ticket
        </h1>

        {/* Subtitle */}
        <h2 className="text-[20px] md:text-[22px] text-center text-gray-800 font-medium mb-4">
          Orders
        </h2>

        {/* Ticket Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-center">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket Status
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.tickets?.length > 0 ? (
                data.tickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-black hover:underline hover:text-blue-500">
                      <Link href={`/my-ticket/${ticket.id}`}>
                        {ticket.event.name}
                      </Link>
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.event.location}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(ticket.event.eventDate).toLocaleDateString()} /{' '}
                      {new Date(ticket.event.eventTime).toLocaleTimeString()}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(ticket.purchaseDate).toLocaleDateString()}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(ticket.price)}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.status}
                    </td>
                    <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="btn btn-ghost btn-xs">
                        <Link href={`/my-ticket/${ticket.id}`}>details</Link>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-2 md:px-4 py-2 md:py-4 text-center text-sm text-gray-900"
                  >
                    No tickets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-6 md:mt-10">
          <Link href={'/event'}>
            <button
              type="submit"
              className="text-white bg-Dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 md:px-5 py-2 md:py-2.5 text-center"
            >
              Save
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MyTicket;
