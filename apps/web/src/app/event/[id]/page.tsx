'use client'
import Image from 'next/image';
import afgan from '@/assets/afgan.png';
import { useState } from 'react';
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const DetailEvent = () => {
    const ticketPrice = 500000
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
        const value = Math.max(1, Math.min(100, Number(e.target.value) || 1));
        setTicketCount(value);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex bg-black p-8 rounded-lg gap-[80px]'>
                <div className='shadow-sm shadow-white rounded-lg'>
                    <Image src={afgan} alt='image' width={450} />
                </div>
                <div className='flex flex-col justify-between text-white gap-4'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-3xl font-bold'>Afgan ComeBack</h1>
                        <div className='text-extrathin text-lg'>
                            <h1 className='font-semibold'>Date & Time</h1>
                            <p className='text-[#d9d9d9]'>TuesDay, 10 Septemper 2024 | 19:00 WIB</p>
                        </div>
                        <div className='text-extrathin text-lg'>
                            <h1 className='font-semibold'>Location</h1>
                            <p className='text-[#d9d9d9]'>Istora, Jakarta</p>
                        </div>
                        <div className='text-extrathin text-lg'>
                            <h1 className='font-semibold'>Organized By</h1>
                            <p className='text-[#d9d9d9]'>BudiLim Entertainment</p>
                        </div>
                        <div className='text-extrathin text-lg'>
                            <h1 className='font-semibold'>General Admission</h1>
                            <div className='flex justify-between w-full'>
                                <h1>Rp. {(ticketPrice * ticketCount).toLocaleString('id-ID')},-</h1>
                                <div className='flex items-center gap-3'>
                                    <FiMinusCircle onClick={minusCount} size={26} />
                                    <input
                                        type=""
                                        value={ticketCount}
                                        onChange={handleInputChange}
                                        className="w-10 text-center border border-gray-300 rounded"

                                    />
                                    <FiPlusCircle onClick={plusCount} size={26} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Discount Voucher</h1>
                            <input type="text" placeholder='Refferal Code Here . . .' className='input input-bordered' />
                        </div>
                    </div>


                    <div className='flex justify-between items-center'>
                        <h1 className='font-bold'>Total : {(ticketPrice * ticketCount).toLocaleString('id-ID')},-</h1>
                        <h1 className='bg-blue-700 p-2 rounded-lg'>Check Out</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailEvent


{/* <div className='text-extrathin text-lg text-[#d9d9d9]'>
    <h1>Sales End on 1 Sep 2024</h1>
</div> */}