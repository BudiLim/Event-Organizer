'use client';
import { getToken } from '@/lib/server';
import { DecodedToken, Discount, Points } from '@/type/user';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getMyVoucherDetails, getMyPoints } from '@/lib/voucher';

const MyVoucher = () => {
  const [voucher, setVoucher] = useState<Discount[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
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

        const { result: voucherResult, ok: voucherOK } =
          await getMyVoucherDetails(userId);
        if (voucherOK) {
          setVoucher(voucherResult.data);
        } else {
          setError(voucherResult.message || 'Failed to fetch data');
        }

        const { result: pointsResult, ok: pointsOK } =
          await getMyPoints(userId);
        if (pointsOK) {
          setPoints(pointsResult.data);
        } else {
          setError(pointsResult.message || 'Failed to fetch data');
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
  if (!voucher)
    return <p className="text-white text-center">No ticket found</p>;

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
    <section className="relative w-full flex flex-col min-h-screen items-center py-5 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8 bg-black text-white">
      <div className="w-full max-w-5xl bg-black text-white shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6">
          Promotion
        </h1>

        {/* Subtitle */}
        <h2 className="text-lg md:text-xl lg:text-2xl text-center font-medium mb-4">
          My Vouchers
        </h2>

        {/* Voucher Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-white text-center">
            <thead className="bg-black text-white font-bold">
              <tr>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  No
                </th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  Voucher Code
                </th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  Discount Amount
                </th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  Valid Until
                </th>
              </tr>
            </thead>
            <tbody className="bg-black text-white divide-y divide-gray-200">
              {voucher.length > 0 ? (
                voucher.map((voucher, index) => (
                  <tr key={voucher.id}>
                    <td className="px-2 py-2 text-sm font-medium">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-sm">{voucher.voucherCode}</td>
                    <td className="px-2 py-2 text-sm">
                      {voucher.discountVoucher}%
                    </td>
                    <td className="px-2 py-2 text-sm">
                      {formatDate(voucher.validUntil)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-4 text-center text-sm text-gray-300"
                  >
                    No vouchers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-5" />

        {/* Subtitle */}
        <h2 className="text-lg md:text-xl lg:text-2xl text-center font-medium mb-4">
          My Points
        </h2>

        {/* Points Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black border border-white text-center">
            <thead className="bg-black text-white font-bold">
              <tr>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  No
                </th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  Points
                </th>
                <th className="px-2 py-1 text-xs font-medium uppercase tracking-wider">
                  Valid Until
                </th>
              </tr>
            </thead>
            <tbody className="bg-black text-white divide-y divide-gray-200">
              {Array.isArray(points) && points.length > 0 ? (
                points.map((points, index) => (
                  <tr key={points.id}>
                    <td className="px-2 py-2 text-sm font-medium">
                      {index + 1}
                    </td>
                    <td className="px-2 py-2 text-sm">
                      {(points.points > 0 ? points.points : 0).toLocaleString(
                        'id-ID',
                      )}
                    </td>
                    <td className="px-2 py-2 text-sm">
                      {formatDate(points.expiresAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-4 text-center text-sm text-gray-300"
                  >
                    No points found
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

export default MyVoucher;
