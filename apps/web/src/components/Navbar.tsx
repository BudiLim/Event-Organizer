import Image from "next/image";
import logo from "../assets/logo.png"
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

export default function Navbar() {
    return (
        <div className="flex justify-between bg-black h-[60px] px-[40px]">
            <div className="flex items-center">
                <Image src={logo} alt="logo" width={35} height={35}/>
            </div>
            <div className="flex gap-[30px] items-center text-sm ">
                <Link href={'/'} className="text-white font-semibold">Category</Link>
                <Link href={'/'} className="text-white font-semibold">Create Event</Link>
                <Link href={'/login'}>
                    <button className="bg-white text-black w-[80px] h-[30px] rounded-full">Login</button> 
                </Link>
                <Link href={'/signUp'}>
                    <button className="bg-white text-black w-[80px] h-[30px] rounded-full">Sign Up</button> 
                </Link>
            </div>
        </div>
    )
} 