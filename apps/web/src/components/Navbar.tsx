'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import SearchInput from "@/app/search-bar/page";
import Link from "next/link";
import LoginSignUp from "@/app/login-signup/page";
import { FiMenu } from "react-icons/fi";
import { deleteToken, getToken } from "@/lib/server"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import LogOut from "@/app/logout/page";
import { logoutAction } from "@/redux/slice/authorSlice";

const Navbar = () => {
  const [token, setToken] = useState('')
  const dispatch = useAppDispatch()
  const getData = async () => {
      const res = await getToken()
      setToken(res || '')
  }
  const author = useAppSelector((state) => state.author)
  const onLogout = async () => {
      await deleteToken()
      dispatch(logoutAction())
      setToken('')
  }

  useEffect(() => {
      getData()
  }, [])

  return (
    <div className="fixed flex justify-between top-0 z-10 h-[60px] w-full px-[20px] lg:px-[40px] bg-black bg-opacity-70">
      <div className="flex items-center h-full">
        <Link href={'/'}>
          <Image src={logo} alt="logo" width={35} height={35} objectFit="cover" />
        </Link>
      </div>

      <div>
        {author.firstName}
        {author.lastName}
        {author.email}
        {author.role}
      </div>

      <div className="lg:hidden flex h-full items-center gap-[15px]">
        <SearchInput />
        <FiMenu size={30} color="white"  />
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

      {
        author.id ? 
        <div onClick={onLogout}>
        <LogOut/>
        </div>
          :
        <LoginSignUp/>
      }

      </div>

      {/* Sidebar */}
      {/* <div className={`fixed top-0 left-0 h-full w-[250px] bg-[#101010] transform `}>
        <div className="flex justify-between items-center p-4">
          <Image src={logo} alt="logo" width={35} height={35} objectFit="cover" />
          <FiX size={30} color="white" />
        </div>
        <div className="flex flex-col p-4">
          <Link href={'/'} className="font-semibold text-white text-[15px] mb-4">Single Band</Link>
          <Link href={'/'} className="font-semibold text-white text-[15px] mb-4">Group Band</Link>
          <Link href={'/'} className="font-semibold text-white text-[15px] mb-4">Disc Jockey</Link>
          <Link href={'/create-event'} className="font-semibold text-white text-[15px]">Create Events</Link>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
