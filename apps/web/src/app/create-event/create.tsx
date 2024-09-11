import Link from 'next/link';
import Image from 'next/image';
import afgan from '@/assets/afgan.png';

export default function CretaeEvents() {
  return (
    <section className="relative w-full flex justify-center items-center py-10 px-5">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create Your Event
        </h1>
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
              <input
                type="text"
                placeholder="Afgan Comeback"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Location</h2>
              <input
                type="text"
                placeholder="Jakarta"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold"> Event Date</h2>
                <input
                  type="date"
                  placeholder="10 Sep 2024"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Time</h2>
                <input
                  type="time"
                  placeholder="19:00 WIB"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
            </div>

            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold"> Selling End at</h2>
                <input
                  type="date"
                  placeholder="10 Sep 2024"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Time</h2>
                <input
                  type="time"
                  placeholder="19:00 WIB"
                  className="input input-bordered input-sm w-full max-w-xs"
                />
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Total Seat Capacity</h2>
              <input
                type="text"
                placeholder="100"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Ticket Price</h2>
              <input
                type="text"
                placeholder="Rp. 500.000,-"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <Link href={'/my-event'}>
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