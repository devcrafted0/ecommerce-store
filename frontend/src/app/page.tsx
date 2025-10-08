"use client";

import FilterMainPage from "@/components/FilterMainPage";
import Navabar from "@/components/Navabar";
import { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import ImageSwiper from "@/components/main/ImageSwiper";
import MainCard from "@/components/main/MainCard";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen">
      <Navabar />

      <div className="relative h-full">
        {/* Filter Button With Arrow */}
        <div
          className="m-5  bg-gray-200/60 inline-flex gap-2 justify-center items-center px-4 py-2 rounded-full [@media(max-width:849px)]:hidden [@media(min-width:1445px)]:hidden text-black font-semibold cursor-pointer hover:bg-gray-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span>Filters</span>
          {sidebarOpen ? <FaLongArrowAltLeft /> : <FaLongArrowAltRight />}
        </div>

        {/* The Phone fiter is not here, that is kept inside the Navbar component */}

        <div className="flex h-full">
          {/* Main Filter Sidebar */}
          <div
            className={`absolute z-50 rounded-xl bg-[#f3e8ff] [@media(max-width:849px)]:hidden ${
              sidebarOpen ? "block" : "hidden"
            } transition-all duration-200 [@media(min-width:1445px)]:block [@media(min-width:1445px)]:bg-white [@media(min-width:1445px)]:border-r [@media(min-width:1445px)]:border-gray-200 [@media(min-width:1445px)]:rounded-none [@media(min-width:1445px)]:h-full [@media(min-width:1445px)]:relative`}
          >
            <FilterMainPage />
          </div>
          
          <div className="flex flex-col h-full">
            {/* Swiper */}
            <div className="p-4">
              <ImageSwiper
                images={["/deals1.png", "/deals2.png", "/deals3.png"]}
              />
            </div>

            {/* Under Content */}
            <div className="p-4">
              <h1>Fruits</h1>
              <MainCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
