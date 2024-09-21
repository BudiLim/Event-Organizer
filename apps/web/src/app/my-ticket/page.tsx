'use client';
import { getMyTicketDetails } from '@/lib/ticket';
import { getToken } from '@/lib/server';
import { DecodedToken, TicketDetails } from '@/type/user';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';


const MyTicket = () => {
  const [data, setData] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (!token) {
        router.push('/my-ticket')
        return;
      }
      try {
        // Decode the token to extract userId
        const decodedToken: DecodedToken = jwtDecode(token);

        if(decodedToken.userType !== 'Experience') {
          router.push('/unauthorized');
          return
        }


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

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!data) return <p className="text-white text-center">No ticket found</p>;

  // Function ganti angka harga
  const formatPrice = (price: number) => {
    return `Rp. ${new Intl.NumberFormat('id-ID').format(price)}`;
  };

  const formatDate = (dateString: string) => {
    return moment(dateString).format('DD MMM YYYY'); // Formats the date
  };

  const formatTime24Hour = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <section className="zrelative w-full flex flex-col items-center py-5 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8 bg-black text-white">
      <div className="w-full max-w-5xl bg-black text-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6">
          My Ticket
        </h1>

        {/* Subtitle */}
        <h2 className="text-lg md:text-xl lg:text-2xl text-center font-medium mb-4">
          Orders
        </h2>

        {/* Ticket Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-white text-center">
            <thead className="bg-black text-white font-bold">
              <tr>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">No</th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">Event Name</th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">Location</th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">Date & Time</th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">Purchase Date</th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">Price</th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">Ticket Status</th>
                <th className="px-2 py-1"></th>
              </tr>
            </thead>
            <tbody className="bg-black text-white divide-y divide-gray-200">
              {data?.tickets?.length > 0 ? (
                data.tickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td className="px-2 py-2 text-sm font-medium">{index + 1}</td>
                    <td className="px-2 py-2 text-sm hover:underline hover:text-blue-500">
                      <Link href={`/my-ticket/${ticket.id}`}>
                        {ticket.event.name}
                      </Link>
                    </td>
                    <td className="px-2 py-2 text-sm">{ticket.event.location}</td>
                    <td className="px-2 py-2 text-sm">
                      {formatDate(ticket.event.eventDate)} / {formatTime24Hour(ticket.event.eventDate)}
                    </td>
                    <td className="px-2 py-2 text-sm">{formatDate(ticket.purchaseDate)}</td>
                    <td className="px-2 py-2 text-sm">{formatPrice(ticket.price)}</td>
                    <td className="px-2 py-2 text-sm">{ticket.status}</td>
                    <td className="px-2 py-2 text-right text-sm font-medium">
                      <Link href={`/my-ticket/${ticket.id}`}>
                        <button className="text-blue-500 hover:underline">Details</button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-2 py-4 text-center text-sm text-gray-300"
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
          <Link href="/event">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5"
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
