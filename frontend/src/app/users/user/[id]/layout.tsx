"use client";
import assets from "@/assets/assets";
import { User, useUser } from "@/context/userContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";

// This type is used to overcome the success property problem
type ThisUser = User & { success: boolean };

const UserPagelayout = ({ params , children }: { params: Promise<{ id: string }> ; children : React.ReactNode; }) => {
  const { user: currentLoggedInUser, loadingUser } = useUser();
  const { id } = use(params);
  const [user, setUser] = useState<ThisUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = await fetch(`/api/v1/users/${id}`);
      const data = await res.json();

      if (res.status === 200) {
        setUser(data.data);
      } else {
        setUser(data);
      }

      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user || loading || loadingUser) {
    return <div>Loading...</div>;
  }

  const isOwnProfile = currentLoggedInUser && user && currentLoggedInUser._id === user._id;


  if (user) {
    if (user.success === false) {
      return <div>User Not Found</div>;
    } else if (user?.role !== "seller") {
      return (
        <div className="text-4xl w-screen h-[80vh] space-y-5 flex justify-center items-center text-primary flex-col">
          <div className="flex gap-2">
            User is not a Seller
            <span className="scale-150">
              <BiCart />
            </span>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-primary border-primary border px-3 py-2 text-2xl rounded hover:bg-primary hover:text-primary cursor-pointer transition-all duration-200"
          >
            Back To Home
          </button>
        </div>
      );
    }
  }

  const subPagesLinks : {link : string ; name : string,}[] = [
    {
        link : `/users/user/${id}`,
        name : 'Home',
    } ,
    {
        link : `/users/user/${id}/products`,
        name : 'Products'
    },
    {
        link : `/users/user/${id}/videos`,
        name : 'Videos'
    }
  ];


  return (
    <div>
      <div className="bg-white text-gray-900 min-h-screen p-4 md:p-8">
        {/* Banner Image */}
        <div className="relative w-full h-48 md:h-64 lg:h-80 mb-6 rounded-lg overflow-hidden">
          <Image
            src={
              user.coverImage === "No Cover Image"
                ? assets.noCoverImage
                : user.coverImage
            }
            alt="user banner"
            className="w-full h-full object-cover"
            width={100}
            height={100}
            unoptimized={true}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider drop-shadow-2xl">
              {user.coverImage === "No Cover Image" && "No Cover Image"}
            </h1>
          </div>
        </div>

        {/* Channel Info Section */}
        <div className="max-w-full mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden border-4 border-gray-200">
                <div className="text-white text-5xl md:text-6xl font-bold">
                  <Image
                    unoptimized={true}
                    src={user.avatar}
                    width={160}
                    height={160}
                    alt="avatar"
                  />
                </div>
              </div>
            </div>

            {/* Channel Details */}
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl md:text-3xl font-semibold">
                  {user.fullName.firstname} {user.fullName.lastname}
                </h2>
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>

              <div className="text-gray-400 text-sm md:text-base mb-3 space-y-1">
                <p>@{user.username} · 2.39M subscribers · 183 videos</p>
              </div>

              <p className="text-gray-300 text-sm md:text-base mb-4">
                Speak a good word or Remain Silent – Muhammad ﷺ{" "}
                <button className="text-gray-400 hover:text-primary">
                  ...more
                </button>
              </p>

              {!isOwnProfile && (
                <button className="bg-primary cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-colors">
                  Follow
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 border-b border-gray-800">
            <nav className="flex gap-6 overflow-x-auto">
                {subPagesLinks.map((page , i)=>{
                    const isActive = pathname === page.link;
                    return <Link href={page.link} key={i} className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap hover:text-primary hover:border-primary ${isActive ? 'text-primary border-primary' : 'border-white'}`}>
                        {page.name}
                    </Link>
                })}
            </nav>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default UserPagelayout;
