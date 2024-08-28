import Link from 'next/link';
import Image from 'next/image';
import afgan from '@/assets/afgan.png';

export default function TicketDetails() {
  return (
    <section className="relative w-full flex justify-center items-center py-10 px-5">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">Ticket Details</h1>
        <div className="border-t border-gray-300 mb-6"></div>

        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
            <div className="relative w-[300px] h-[400px]">
              <Image
                src={afgan}
                alt="afgan"
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
                Afgan Comeback
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Location</h2>
              <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                Jakarta
              </div>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Date</h2>
                <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                  10 Sep 2024
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Time</h2>
                <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                  19:00 WIB
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Seat No.</h2>
              <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                AF-001
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Ticket Price</h2>
              <div className="bg-gray-100 text-gray-800 rounded-md px-4 py-2">
                Rp. 440.000,-
              </div>
            </div>
          </div>
        </div>

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
