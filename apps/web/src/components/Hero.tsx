import Image from "next/image";
import hero from "../assets/hero_img.png"

export default function Hero() {
  return (
    <div className="relative w-full h-screen shadow-md shadow-white">
      <Image 
      src={hero} 
      alt="hero" 
      layout="fill" 
      objectFit="cover" 
      className="absolute inset-0"/>
      <div className="absolute font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-[10px]">
        <h1 className="font-bold text-[40px]">Where Event Organizers Grow</h1>
        <p className="font-normal text-[24px]">The all-in-one ticketing and discovery platform trusted
        by millions of organizers and attendees worldwide</p>
        <button className="font-bold text-[24px] w-[180px] h-[60px] border-[3px] rounded-full">Get Started</button>
      </div>
    </div>
  )
}