'use client'
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import logo from "../assets/logo.png";
import SearchInput from "@/app/search-bar/page";
import Link from "next/link";
import LoginSignUp from "@/app/login-signup/page";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="fixed flex justify-between top-0 z-10 h-[60px] w-full px-[20px] lg:px-[40px] bg-black bg-opacity-70">
      <div className="flex items-center h-full">
        <Link href={'/'}>
          <Image src={logo} alt="logo" width={35} height={35} objectFit="cover" />
        </Link>
      </div>

      <div className="lg:hidden flex h-full items-center gap-[15px]">
        <SearchInput/>
        <FiMenu size={30} color="white" onClick={toggleSidebar} />
      </div>

      <div className="hidden lg:flex h-full items-center gap-[30px]">
        <SearchInput />

        {/* Category dropdown */}
        <div className="flex items-center">
          <div className="dropdown dropdown-hover">
            <div tabIndex={1} role="button" className="bg-transparent font-semibold text-[15px] text-white hover:scale-105">Category</div>
            <ul tabIndex={1} className="dropdown-content menu bg-[#101010] text-white font-medium rounded-md w-[140px]">
              <li><Link href={'/'} className="hover:scale-105">Single Band</Link></li>
              <li><Link href={'/'} className="hover:scale-105">Group Band</Link></li>
              <li><Link href={'/'} className="hover:scale-105">Disc Jockey</Link></li>
            </ul>
          </div>
        </div>

        <Link href={'/create-event'} className="font-semibold text-white text-[15px] hover:scale-105">Create Events</Link>

        <LoginSignUp />
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[250px] bg-[#101010] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
        <div className="flex justify-between items-center p-4">
          <Image src={logo} alt="logo" width={35} height={35} objectFit="cover" />
          <FiX size={30} color="white" onClick={toggleSidebar} />
        </div>
        <div className="flex flex-col p-4">
          <Link href={'/'} className="font-semibold text-white text-[15px] mb-4">Single Band</Link>
          <Link href={'/'} className="font-semibold text-white text-[15px] mb-4">Group Band</Link>
          <Link href={'/'} className="font-semibold text-white text-[15px] mb-4">Disc Jockey</Link>
          <Link href={'/create-event'} className="font-semibold text-white text-[15px]">Create Events</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
