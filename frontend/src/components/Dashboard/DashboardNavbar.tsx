import Link from "next/link"
import NavbarUser from "../NavbarUser"
import Image from "next/image"
import assets from "@/assets/assets"

const DashboardNavbar = () => {
  return (
    <div className="bg-[#FEFEFE] border-b border-gray-200 pb-4 flex justify-between pt-8 w-full max-w-full m-auto items-center px-20">
        <Link href='/'>
            <Image className="cursor-pointer" src={assets.logo} alt="logo" width={180} height={180}/>
        </Link>
        <NavbarUser/>
    </div>
  )
}

export default DashboardNavbar