import Link from 'next/link';

export default function MyTicket() {
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
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seat No.
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* row 1 */}
              <tr>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  1
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-black hover:underline hover:text-blue-500">
                  <Link href={'/my-ticket/details'}>Afgan Comeback</Link>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  Jakarta
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  10 September 2024 / 19:00 WIB
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  AF-001
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp. 440.000,-
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="btn btn-ghost btn-xs">
                    <Link href={'/my-ticket/details'}>details</Link>
                  </button>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  2
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-black hover:underline hover:text-blue-500">
                  <Link href={'/my-ticket/details'}>
                    Ed Sheeran Live In Bandung
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  Bandung
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  8 December 2024 / 19:00 WIB
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  ES-001
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  Rp. 2.500.000,-
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="btn btn-ghost btn-xs">
                    <Link href={'/my-ticket/details'}>details</Link>
                  </button>
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  3
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-black hover:underline hover:text-blue-500">
                  <Link href={'/my-ticket/details'}>
                    Rizky Febian Bandung Love Story
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  Bandung
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  10 Oktober 2024 / 17:00 WIB
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  RB-001
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-sm text-gray-900">
                  FREE
                </td>
                <td className="px-2 md:px-4 py-2 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="btn btn-ghost btn-xs">
                    <Link href={'/my-ticket/details'}>details</Link>
                  </button>
                </td>
              </tr>
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
}
