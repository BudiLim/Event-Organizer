"use client"

import React, { useState } from 'react';
import afgan from '@/assets/afgan.png';
import Image from 'next/image';

const EventCheckout = () => {
  const [ticketCount, setTicketCount] = useState(1);

  const incrementTicket = () => setTicketCount(ticketCount + 1);
  const decrementTicket = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  return (
    <section className="w-full flex justify-center items-center px-5">
      <div className="flex flex-col items-center justify-center min-h-[750px] rounded-lg p-5">
        <div className="flex flex-col bg-white lg:flex-row max-w-4xl w-full rounded-lg shadow-lg overflow-hidden lg:w-[900px] p-2">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <Image 
              className="object-cover w-full h-full" 
              src={afgan}
              alt="Event"
            />
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-6 lg:p-8">
            <h1 className="text-2xl lg:text-3xl font-semibold mb-4 text-center lg:text-left">Afgan Comeback in Jakarta</h1>
            <div className="mb-4">
              <p className="text-gray-600">Date & Time</p>
              <p>Tuesday, 10 September 2024 | 19:00 WIB</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Location</p>
              <p>Istora Senayan, Jakarta</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">General Admission</p>
              <div className="flex items-center justify-between border border-gray-300 p-3 rounded-md">
                <p>Rp. 500.000,-</p>
                <div className="flex items-center space-x-2 w-32 justify-between">
                  <button 
                    onClick={decrementTicket} 
                    className="px-2 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300 w-8"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{ticketCount}</span>
                  <button 
                    onClick={incrementTicket} 
                    className="px-2 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300 w-8"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Sales End on 1 Sep 2024</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">Organized by</p>
              <p className="inline-block px-4 py-2 bg-gray-200 rounded-md">BudiLim Entertainment</p>
            </div>

            <div className="mt-6 text-center lg:text-left">
              <button className="px-6 py-3 border border-gray-500 rounded-full hover:bg-gray-100">
                Buy Ticket
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Selling End at 30 Aug 2024 at 23:59 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCheckout;
