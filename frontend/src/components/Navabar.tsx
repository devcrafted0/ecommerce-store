'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { IoClose, IoMenuOutline  } from "react-icons/io5";
import BodyPortal from "./utils/BodyPortal";
import FilterMainPage from "./FilterMainPage";
import assets from "@/assets/assets";

const Navabar = () => {

    const [isOpen , setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-[#FEFEFE] border-b border-gray-200 pb-4">
        <div>
            <div className="pt-8 w-full max-w-[90vw] m-auto flex justify-between items-center">

                <div onClick={()=>setIsOpen(true)} className="cursor-pointer [@media(min-width:850px)]:hidden mr-4">
                    <IoMenuOutline className="w-7 h-7"/>
                </div>

                <Link className="hidden [@media(min-width:850px)]:block" href='/'>
                    <Image className="cursor-pointer" src={assets.logo} alt="logo" width={180} height={180}/>
                </Link>

                {/* Pc Search Bar */}
                <div className="[@media(max-width:660px)]:hidden border-2 border-transparent has-[:focus]:border-primary/80 transition-colors duration-200 flex justify-center items-center gap-2 bg-white drop-shadow-md p-2 py-3 rounded-full w-100">
                    <div className="p-2 rounded-full bg-primary/10">
                        <Image className="" src={assets.search} alt="search" width={15} height={15}/>
                    </div>
                    <input className="w-full border-none outline-none mr-3 text-gray-800" type="text" placeholder="Search" />
                </div>

                <div className="flex justify-center items-center">
                    <button className="relative cursor-pointer ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="text-primary lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>

                        <div className="w-5 h-5 rounded-full absolute -top-4 -right-3 900 flex justify-center items-center text-sm shadow-inner bg-primary/20">
                            1
                        </div>
                    </button>

                    <Link href='/login' className="transition-colors duration-200 cursor-pointer hover:bg-primary/10 ml-8 my-2 px-6 py-3 flex items-center gap-2 border-primary border rounded-full">
                        <Image className="w-4 h-4" src={assets.user} alt="user" width={50} height={50}/>
                        <span className="font-bold">Login</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-3 w-full flex justify-center items-center [@media(min-width:660px)]:hidden">
                <div className="border-2 border-transparent has-[:focus]:border-primary/80 transition-colors duration-200 flex justify-center items-center gap-2 bg-white drop-shadow-md p-2 py-3 rounded-full w-[80vw]">
                    <div className="p-2 rounded-full bg-primary/10">
                        <Image className="" src={assets.search} alt="search" width={15} height={15}/>
                    </div>
                    <input className="w-full border-none outline-none mr-3 text-gray-800" type="text" placeholder="Search" />
                </div>
            </div>
        </div>

        {/* Phone SideMenu */}
        <BodyPortal>
          <div className={`absolute z-50 top-0 left-0 w-[250px] h-full bg-[#f3e8ff] transform transition-transform duration-200 [@media(min-width:850px)]:hidden ${isOpen ? 'translate-x-[0%]' : '-translate-x-[200%]'}`}>
            <div className="p-10 pb-0">
                <Link href='/'>
                <Image className="cursor-pointer" src={assets.logo} alt="logo" width={180} height={180}/>
                </Link>
            </div>
            
            <div onClick={()=>setIsOpen(false)} className="text-2xl text-red-500 absolute top-3 right-3 cursor-pointer">
                <IoClose/>
            </div>

            <div>
                <FilterMainPage/>
            </div>

          </div>
        </BodyPortal>
    </nav>
  )
}

export default Navabar;