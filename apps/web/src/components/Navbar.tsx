'use client';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { HiCurrencyDollar } from "react-icons/hi";
import coin from '../assets/Coin.png'
import logo from '../assets/logo.png';
import { FiUser } from "react-icons/fi";
import Link from 'next/link';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { useAuth } from '@/app/AuthContext'; // Import useAuth
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { loggedIn, userEmail, logout } = useAuth(); // Get loggedIn state, userEmail, and logout function
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null); // Change ref to div
  const router = useRouter(); // Use router for navigation

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };


  useEffect(() => {
    if (loggedIn) {
      // Redirect to another page if logged in
      router.push('/landing_page');
    }
  }, [loggedIn]);


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSignOut = () => {
    logout(); // Clear authentication state
    router.push('/'); // Redirect to homepage
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between bg-black bg-opacity-70 h-[60px] px-[40px]">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={35} height={35} />
        </Link>
      </div>

      <div className="flex gap-[30px] items-center text-[15px]">
        <>
        <div className="relative w-[200px] h-[30px]">
          <input
            type="text"
            placeholder="Search Events"
            className="text-white bg-black border border-white w-full h-full rounded-full text-sm text-center pl-8 pr-4"
          />
          <FiSearch
            className="text-white absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
            size={16}
          />
        </div>

        <div className="relative w-[200px] h-[30px]">
          <input
            type="text"
            placeholder="Location"
            className="text-white bg-black border border-white w-full h-full rounded-full text-sm text-center pl-8 pr-4"
          />
          <FiMapPin
            className="text-white absolute top-1/2 left-2 transform -translate-y-1/2 z-10"
            size={16}
          />
        </div>
          <Link href={'/'} className="text-[#d9d9d9] font-medium transition-transform duration-300 hover:font-bold hover:scale-105  hover:text-white">
            Category
          </Link>
          <Link href={'/'} className="text-[#d9d9d9] font-medium transition-transform duration-300 hover:font-bold hover:scale-105 hover:text-white">
            Create Event
          </Link>
        </>
        {!loggedIn ? (
          <>
            <Link href={'/login'}>
              <button className="bg-white text-black w-[80px] h-[30px] rounded-full hover:font-extrabold">
                Login
              </button>
            </Link>
            <Link href={'/signUp'}>
              <button className="bg-white text-black w-[80px] h-[30px] rounded-full hover:font-extrabold">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className='flex justify-center items-center gap-1'>
              <HiCurrencyDollar color='yellow' size={20}/>
              <h1 className='font-bold text-white'>10.000</h1>
            </div>
            <div
              className="relative flex items-center border-[1px] py-2 px-4 rounded-full"
              ref={profileRef}
              onClick={handleDropdownToggle}
            >
             <FiUser color='white' size={20}/>
              <span className="text-white ml-2 cursor-pointer">
                {userEmail}
              </span>{' '}
              {/* Display user email */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-48 text-black z-50"
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:underline cursor-pointer">
                      <Link href="/my-ticket">My Ticket</Link>
                    </li>
                    <li className="px-4 py-2 hover:underline cursor-pointer">
                      <Link href="/my-event">My Event</Link>
                    </li>
                    <li className="px-4 py-2 hover:underline cursor-pointer">
                      <Link href="/my-dashboard">My Dashboard</Link>
                    </li>
                    <li className="px-4 py-2 hover:underline cursor-pointer">
                      <Link href="/account-settings">Account Settings</Link>
                    </li>
                    <hr className="my-1 border-gray-300" />
                    <li
                      className="px-4 py-2 hover:underline cursor-pointer"
                      onClick={handleSignOut} // Call handleSignOut on click
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

            