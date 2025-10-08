import Image from "next/image";
import { IProduct } from "@/assets/assets";

const MainCard = ({product} : {product : IProduct}) => {
  return (
    <div className="rounded-2xl overflow-hidden bg-red-300 hover:scale-103 cursor-pointer">
      <div className="rounded-2xl w-full">
        <Image className="w-full" src={product.images[0]} alt="img" width={400} height={400} />
      </div>
      <div className="p-4">
        <h1 className="font-semibold">{product.name}</h1>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default MainCard;