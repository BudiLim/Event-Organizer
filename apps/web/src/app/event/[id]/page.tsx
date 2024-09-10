'use client'
import Image from 'next/image';
import afgan from '@/assets/afgan.png';
import { useState } from 'react';

const DetailEvent = () => {

    const [ticketCount, setTicketCount] = useState(1);

    const plusCount = () => {
        if (ticketCount < 100) {
            setTicketCount(prev => prev + 1);
        }
    }

    const minusCount = () => {
        if (ticketCount > 1) {
            setTicketCount(prev => prev - 1);
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setTicketCount(Math.min(Math.max(value, 1), 100));
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen w-full px-[300px]'>
            <div className='flex flex-col bg-black w-5/6 h-[65%]'>
                <div className='w-full text-center text-white '>
                    <h1 className='text-3xl py-5 font-bold'>Event Details</h1>
                    <hr />
                </div>

                <div className='flex justify-center items-center w-full px-[50px]'>      

                        <Image src={afgan} alt='foto-image'
                            width={450}/>

                    <div className="relative w-full font-thin flex flex-col pl-4">
                        <div className="flex text-white gap-[30px] py-2">
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Event Name</h1>
                                <p className="bg-zinc-800 p-1">Afgan</p>
                            </div>
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Location</h1>
                                <p className="bg-zinc-800 p-1">Jakarta</p> 
                            </div>
                        </div>

                        <div className="flex text-white gap-[30px] py-2">
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Start Time</h1>
                                <p className="bg-zinc-800 p-1">--:--</p>
                            </div>
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Finish Time</h1>
                                <p className="bg-zinc-800 p-1">--:--</p>
                            </div>
                        </div>

                        <div className="flex text-white gap-[30px] py-2">
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Event Date</h1>
                                <p className="bg-zinc-800 p-1">--:--:--</p>
                            </div>
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Selling End At</h1>
                                <p className="bg-zinc-800 p-1">--:--:--</p>
                            </div>
                        </div>
                        <div className="flex text-white gap-[30px] py-2">
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Total Seat</h1>
                                <p className="bg-zinc-800 p-1">100</p>
                            </div>
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Available Seat</h1>
                                <p className="bg-zinc-800 p-1">100</p>
                            </div>
                        </div>
                        <div className="flex text-white gap-[30px] py-2">
                            <div className='w-[315px]'>
                                <h1 className="font-medium text-lg">Ticket Price</h1>
                                <p className="bg-zinc-800 p-1">Rp. 300.000,-</p>
                            </div>
                        </div>
                        <div className='w-full text-center pt-4'>
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    className="text-2xl bg-zinc-800 p-2 rounded-full w-8 h-8 flex items-center justify-center"
                                    onClick={minusCount}
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={ticketCount}
                                    className="w-12 text-center bg-zinc-800 text-white p-2 rounded-md"
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="text-2xl bg-zinc-800 p-2 rounded-full w-8 h-8 flex items-center justify-center"
                                    onClick={plusCount}
                                >
                                    +
                                </button>
                            </div>
                            <h1 className='pt-2 font-semibold text-white'>Total Price</h1>
                            <p className='text-white'>Rp. {(ticketCount * 300000).toLocaleString('id-ID')},-</p>

                            <button className="absolute bottom-0 right-0 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                                Checkout
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default DetailEvent