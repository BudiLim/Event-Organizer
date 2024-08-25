import Image from "next/image";
import afgan from "../assets/afgan.png"
import billie_eilish from "../assets/billie eilish.png"
import hozier from "../assets/hozier.png"
import { FiChevronRight } from "react-icons/fi";;

export default function Event() {
    return (
        <div className="flex justify-center pt-[30px] text-white">
            <div>
                <h1 className="text-[32px] text-center font-medium">On Going <span className="font-bold">Event</span></h1>
                <div className="flex gap-[30px] pt-[35px]">
                    <div className="relative w-300 h-450 ">
                        <Image src={afgan} alt="afgan"/>
                        <div className="absolute inset-0 flex flex-col justify-end items-center text-center shadow-md shadow-white rounded-[20px]">
                            <div className=" w-full h-[120px] bg-black bg-opacity-50 flex flex-col justify-center text-[20px] rounded-b-[20px] font-medium">
                                <h1 className="font-bold">Afgan</h1>
                                <h1>Jakarta</h1>
                                <h1>10-9-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-300 h-450">
                        <Image src={billie_eilish} alt="billie eilish"/>
                        <div className="absolute inset-0 flex flex-col justify-end items-center text-center shadow-md shadow-white rounded-[20px]">
                            <div className=" w-full h-[120px] bg-black bg-opacity-50 flex flex-col justify-center text-[20px] rounded-b-[20px]  font-medium">
                                <h1 className="font-bold">Billie Eilish</h1>
                                <h1>Jakarta</h1>
                                <h1>21-9-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-300 h-450">
                        <Image src={hozier} alt="hozier"/>
                        <div className="absolute inset-0 flex flex-col justify-end items-center text-center shadow-md shadow-white rounded-[20px]">
                            <div className=" w-full h-[120px] bg-black bg-opacity-50 flex flex-col justify-center text-[20px] rounded-b-[20px]  font-medium">
                                <h1 className="font-bold">Hozier</h1>
                                <h1>Bandung</h1>
                                <h1>15-10-2024</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center py-[75px] gap-1">
                    <h1 className="font-semibold text-xl text-center">See More</h1>
                    <FiChevronRight size={20} />
                </div>
            </div>
        </div>
    )
}