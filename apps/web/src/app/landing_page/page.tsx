import Image from "next/image";
import hero from "../../assets/hero_landing_page.png"
import afgan from "../../assets/afgan.png"
import billie_eilish from "../../assets/billie_eilish.png"
import hozier from "../../assets/hozier.png"
import adele from "../../assets/adele.png"
import rf from "../../assets/rizki_febian.png"
import ed_sheeran from "../../assets/ed_sheeran.png"
import black_pink from "../../assets/black_pink.png"
import coldplay from "../../assets/Coldplay.png"
import jkt48 from "../../assets/jkt48.png"
import twice from "../../assets/twice.png"
import one_direction from "../../assets/one_direction.png"
import fifth_harmony from "../../assets/fifth_harmony.png"
import alan_walker from "../../assets/alan_walker.png"
import marshmello from "../../assets/marshmello.png"
import snake from "../../assets/snake.png"


export default function LandingPage() {
    return (
        <div className="relative w-full">
            <div className="relative mx-auto lg:w-[90%] h-[450px] lg:h-screen shadow-md shadow-slate-500">
                <Image src={hero}
                    alt="hero"
                    layout="fill"
                    objectFit="cover" />
            </div>
            <div id="category" className="flex flex-col items-center text-white">

            <h1 className="text-[35px] text-white font-medium py-[35px]">Music Events <span className="font-bold">Category</span> </h1>

                {/* single band */}

                <h1 className="text-[32px] text-white font-medium py-[35px]">Single <span className="font-bold">Band</span> </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-20">
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
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
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
                        <Image src={billie_eilish}
                            alt="biilie_eilish"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Billie Eilish</h1>
                                <h1>Jakarta</h1>
                                <h1>21-9-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
                        <Image src={hozier}
                            alt="hozier"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Hozier</h1>
                                <h1>Bandung</h1>
                                <h1>15-10-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
                        <Image src={adele}
                            alt="adele"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Adele</h1>
                                <h1>Jakarta</h1>
                                <h1>11-10-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
                        <Image src={rf}
                            alt="rizki_febian"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Rizki Febian</h1>
                                <h1>Bandung</h1>
                                <h1>24-10-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
                        <Image src={ed_sheeran}
                            alt="ed_sheeran"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Ed Sheeran</h1>
                                <h1>Bandung</h1>
                                <h1>8-12-2024</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Group band */}

                <h1 className="text-[32px] text-white font-medium pt-[80px] pb-[35px]">Group <span className="font-bold">Band</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-20">
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={black_pink}
                            alt="blackpink"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Black Pink</h1>
                                <h1>Jakarta</h1>
                                <h1>10-9-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={coldplay}
                            alt="coldplay"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Coldplay</h1>
                                <h1>Bandung</h1>
                                <h1>18-10-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={jkt48}
                            alt="jkt48"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">JKT 48</h1>
                                <h1>Jakarta</h1>
                                <h1>8-11-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={twice}
                            alt="twice"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Twice</h1>
                                <h1>Bandung</h1>
                                <h1>11-12-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={one_direction}
                            alt="one_direction"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">One Direction</h1>
                                <h1>Jakarta</h1>
                                <h1>8-10-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={fifth_harmony}
                            alt="fifth_harmony"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Fifth Harmony</h1>
                                <h1>Jakarta</h1>
                                <h1>17-12-2024</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disc Jockey */}

                <h1 className="text-[32px] text-white font-medium pt-[80px] pb-[35px]">Disc <span className="font-bold">Jockey</span></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-20 pb-20">
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={alan_walker}
                            alt="alan_walker"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Alan Walker</h1>
                                <h1>Jakarta</h1>
                                <h1>25-12-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={marshmello}
                            alt="marshmello"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">MarshMello</h1>
                                <h1>Bandung</h1>
                                <h1>10-12-2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-300 hover:scale-105">
                        <Image src={snake}
                            alt="snake"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center">
                            <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                                <h1 className="font-bold">Snake</h1>
                                <h1>Bandung</h1>
                                <h1>30-12-2024</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}