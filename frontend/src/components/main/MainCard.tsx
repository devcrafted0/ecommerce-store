import assets from "@/assets/assets"
import Image from "next/image"

const MainCard = () => {
  return (
    <div>
      <div className="p-5">
        <Image src={assets.logo} alt="img" width={400} height={400}/>
      </div>
    </div>
  )
}

export default MainCard