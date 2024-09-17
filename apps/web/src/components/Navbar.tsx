'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import SearchInput from "@/app/search-bar/page";
import Link from "next/link";
import LoginSignUp from "@/app/login-signup/page";
import { FiMenu, FiX } from "react-icons/fi";
import { deleteToken, getToken } from "@/lib/server";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LogOut from "@/app/logout/page";
import { logoutAction } from "@/redux/slice/authorSlice";
import { useRouter } from "next/navigation";
import { Role } from "@/type/role";
import { FiUser } from "react-icons/fi";
import coin from "../assets/Coin.png"

const Navbar = () => {
  const [token, setToken] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const getData = async () => {
    const res = await getToken();
    setToken(res || '');
  };

  const checkRole = (userType: Role) => {
    return user?.userType === userType;
  };

  const onLogout = async () => {
    await deleteToken();
    dispatch(logoutAction());
    router.push('/');
    setToken('');
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    getData();
    console.log('user:', user)
  }, []);



  return (
    <div className="fixed flex justify-between top-0 z-10 h-[60px] w-full px-[20px] lg:px-[40px] bg-black bg-opacity-70">
      <div className="flex items-center h-full">
        <Link href={user.id ? '/event' : '/'}>
          <Image src={logo} alt="logo" width={35} height={35} objectFit="cover" />
        </Link>
      </div>

      <div className="lg:hidden flex h-full items-center gap-[15px]">
        {
          user.id ? (
            <div className="flex gap-[20px]">
       
              <FiMenu size={30} color="white" onClick={toggleSidebar} />
            </div>

          ) : (
            <LoginSignUp />
          )
        }

      </div>

      <div className="hidden lg:flex h-full items-center gap-[30px]">
        {checkRole(Role.Experience) &&
        <div className="flex items-center">
          <div className="dropdown dropdown-hover">
            <div tabIndex={1} role="button" className="bg-transparent font-semibold text-[15px] text-white hover:scale-105">
              Category
            </div>
            <ul tabIndex={1} className="dropdown-content menu bg-[#101010] text-white font-medium rounded-md w-[140px]">
              <li><Link href="/">Single Band</Link></li>
              <li><Link href="/">Group Band</Link></li>
              <li><Link href="/">Disc Jockey</Link></li>
            </ul>
          </div>
        </div>
        }

        {checkRole(Role.Organizer) &&
        <Link className="text-white font-bold text-[16px]" href={'/create-event'}>
          Create Event
        </Link>
        }

        {user.id ? (
          <div>
            {checkRole(Role.Organizer) &&
              <div className="dropdown dropdown-end text-white">
               
                <div tabIndex={0} role="button" className="btn bg-opacity-0 text-white bg-zinc-900 text-[15px]"><FiUser /> {user.firstName + ' ' + user.lastName}</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow">
                  <li><Link href={'/dashboard'}>My Dashboard</Link></li>
                  <li><Link href={'/account-settings'}>Account Setting</Link></li>
                  <li><Link onClick={onLogout} href={'/'}>log Out</Link></li>
                </ul>
              </div>}


            {checkRole(Role.Experience) &&
              <div className="dropdown dropdown-end">
                <div className="flex items-center gap-[30px]">
                  <h1 className="flex items-center gap-1 text-white font-bold text-[15px]"><Image src={coin} alt="coin" width={30} />{user.points}</h1>
                  <div>
                    <div tabIndex={0} role="button" className="btn bg-opacity-0 text-white  bg-zinc-900  text-[15px]"><FiUser /> {user.firstName + ' ' + user.lastName}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li><Link href={'/my-ticket'}>My Ticket</Link></li>
                      <li><Link href={'/account-settings'}>Account Setting</Link></li>
                      <li><Link onClick={onLogout} href={'/'}>log Out</Link></li>
                    </ul>
                  </div>
                </div>
              </div>}

          </div>
        ) : (
          <LoginSignUp />
        )}

      </div>


      {/* Sidebar for smaller screens */}
      <div className={`fixed top-0 left-0 h-full w-[250px]  bg-zinc-900  transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
        <div className="flex justify-between items-center p-4">
          <FiX size={30} color="white" onClick={toggleSidebar} />
        </div>
        <div className="flex flex-col p-4">
          {checkRole(Role.Organizer) &&
            <div className="flex flex-col gap-1 ">
              <h1 className="flex gap-3  items-center font-semibold text-white text-[20px] mb-4"><FiUser />{user.firstName + ' ' + user.lastName}</h1>
              <Link href="/my-event" className="font-semibold text-white text-[15px] mb-4">My event</Link>
              <Link href="/dashboard" className="font-semibold text-white text-[15px] mb-4">DashBoard</Link>
              <Link href="/account-settings" className="font-semibold text-white text-[15px] mb-4">Account setting</Link>
              <Link onClick={onLogout} href="/" className="flex justify-center font-semibold text-black bg-white rounded-full text-[15px] mb-4 w-1/3 p-1">Log Out</Link>
            </div>
          }
          {checkRole(Role.Experience) &&
            <div className="flex flex-col gap-1">
              <h1 className="flex gap-3 items-center font-semibold text-white text-[20px] mb-4"><FiUser />{user.firstName + ' ' + user.lastName}</h1>
              <h1 className="flex items-center gap-2 pb-3 text-white font-medium"><Image src={coin} alt="coin" width={25} />{user.points}</h1>
              <Link href="/my-ticket" className="font-semibold text-white text-[15px] mb-4">My Ticket</Link>
              <Link href="/account-settings" className="font-semibold text-white text-[15px] mb-4">Account Setting</Link>
              <Link onClick={onLogout} href="/" className="flex justify-center font-semibold text-black bg-white rounded-full text-[15px] mb-4 w-1/3 p-1">Log Out</Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
