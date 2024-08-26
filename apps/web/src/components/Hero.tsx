import Image from "next/image";
import hero from "../assets/hero_img.png"
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-screen shadow-sm shadow-white">
      <Image 
      src={hero} 
      alt="hero" 
      layout="fill" 
      objectFit="cover" 
      className="absolute inset-0"/>
      <div className="absolute font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-[10px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Where Event Organizers Grow</h1>
          <p className="font-normal text-base md:text-xl lg:text-2xl">The all-in-one ticketing and discovery platform trusted
          by millions of organizers and attendees worldwide</p>
          <Link href={'/'}>
            <button className="font-bold text-lg md:text-xl lg:text-2xl w-[150px] h-[45px] border-[3px] md:w-[160px] md:h-[50px]  md:border-[3px] lg:w-[180px] lg:h-[60px]  lg:border-[3px] hover:bg-white hover:text-black hover:font-bold rounded-full transition ease-in-out duration-300">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}