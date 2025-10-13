import { useUser } from "@/context/userContext";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const NavbarUser = () => {
  const { user } = useUser();
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const redirect = (route : string) => {
    router.push(`/user/${route}`);
  }
  
  const dropDownData = ['Dashboard', 'Analytics', 'Settings', 'Profile','Logout'];

  return (
    <div className="ml-6 cursor-pointer relative">
      <span onClick={() => setOpen(!open)}>
        <Image
          unoptimized={true}
          src={`${user?.avatar}`}
          width={40}
          height={40}
          alt="userImage"
          className="rounded-full"
        />
      </span>

      <div className="absolute top-10 right-10 z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ 
                opacity: 0,
                height: 0,
                scale: 0.95,
                y: -20
              }}
              animate={{ 
                opacity: 1,
                height: 'auto',
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0,
                height: 0,
                scale: 0.95,
                y: -20
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 },
                height: { duration: 0.5 }
              }}
              className="mt-4 bg-primary/60 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl origin-top"
            >
              <div className="">
                {dropDownData.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <button
                    onClick={()=>redirect(item.toLowerCase())}
                    className="cursor-pointer w-full text-left px-8 py-4 rounded-lg text-[#F8EFFF] hover:bg-[#C93FB0] hover:text-[#FFFFFF] transition-all duration-200 ">
                      {item}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavbarUser;