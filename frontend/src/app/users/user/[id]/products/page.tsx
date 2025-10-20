'use client'
import { type Product } from "@/assets/assets";
import axios, { AxiosError } from "axios";
import { use, useEffect, useState } from "react";
import ProductCard from '@/components/main/ProductCard'
import Loader from "@/components/main/Loader";

const page = ({params} : {params : Promise<{ id: string }>}) => {
   const { id } = use(params);
   const [products , setProducts] = useState<Product[]>([]);
   const [loading , setLoading] = useState<boolean>(false);

   const fetchProducts = async() => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/product?userId=${id}`);
      // For directly getting the products
      setProducts(res.data.data);
    } catch (err) {
      if(err instanceof AxiosError){
        console.error(`Axios Error : ${err.message}`);
      } else {
        console.error(`Unknown Error : ${err}`)
      }
    } finally {
      setLoading(false);
    }
   }

   useEffect(()=>{
    console.log(products);
   }, [products]);

   useEffect(()=>{
    fetchProducts();
  }, [])

  if(loading){
    return <Loader/>
  }

  return (
    <div>
      <div className="text-x sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-5 flex items-center gap-2">
        <span className="text-main">Products</span>
        <span className="w-8 h-[3px] bg-main"></span>
      </div>

      {products.length <= 0 ? <div>No Products Found</div> :
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map(product => (
            <ProductCard product={product} key={product._id}/>
          ))}
      </div>}
    </div>
  )
}

export default page