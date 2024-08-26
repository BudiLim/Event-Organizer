import Image from "next/image";
import afgan from "../assets/afgan.png"
import billie_eilish from "../assets/billie_eilish.png"
import hozier from "../assets/hozier.png"
import { FiChevronRight } from "react-icons/fi";import Link from "next/link";
;

export default function Event() {
    return (
        <div className="flex flex-col items-center text-white py-[30px]">
            <h1 className="text-xl md:text-2xl lg:text-3xl">On Going<span className="font">Event</span></h1>
                <div className="pt-[35px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 ">
                        <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                            <Image src={afgan}
                            alt="afgan"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-center">
                                <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                    <h1 className="font-bold">Afgan</h1>
                                    <h1>Jakarta</h1>
                                    <h1>10-9-2024</h1>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                            <Image src={billie_eilish}
                            alt="afgan"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-center">
                                <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                    <h1 className="font-bold">Billie Eilish</h1>
                                    <h1>Jakarta</h1>
                                    <h1>21-9-2024</h1>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                            <Image src={hozier}
                            alt="afgan"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-center">
                                <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px] ">
                                    <h1 className="font-bold">Hozier</h1>
                                    <h1>Bandung</h1>
                                    <h1>15-10-2024</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            

            <div className="flex text-xl text-[#d9d9d9] font-medium hover:font-bold hover:text-white items-center pt-[75px] pb-[50px]">
                <Link href={'/'}>See More</Link>
                <FiChevronRight />
            </div>
        </div>
    
            
    )
}

{/* <div className="flex gap-[30px] pt-[35px]">
<div className="relative w-300 h-450 ">
    <Image src={afgan} alt="afgan"/>
    <div className="absolute inset-0 flex flex-col justify-end items-center text-center shadow-md shadow-white rounded-[20px]">
        <div className=" w-full h-[120px] bg-black bg-opacity-50 flex flex-col justify-center text-[20px] rounded-b-[20px] font-medium">
            <h1 className="font-bold">Afgan</h1>
            <h1>Jakarta</h1>
            <h1>10-9-2024</h1>
        </div>
    </div>
</div> */}