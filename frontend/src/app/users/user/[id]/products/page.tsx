'use client'
import { type Product } from "@/assets/assets";
import axios, { AxiosError } from "axios";
import { use, useEffect, useState } from "react";
import ProductCard from '@/components/main/ProductCard'
import Loader from "@/components/main/Loader";

const page = ({params} : {params : Promise<{ id: string }>}) => {
   const { id } = use(params);
   const [products , setProducts] = useState<Product[]>([]);

   const fetchProducts = async() => {
    try {
      const res = await axios.get(`/api/v1/product?userId=${id}`);
      // For directly getting the products
      setProducts(res.data.data);
    } catch (err) {
      if(err instanceof AxiosError){
        console.error(`Axios Error : ${err.message}`);
      } else {
        console.error(`Unknown Error : ${err}`)
      }
    }
   }

   useEffect(()=>{
    console.log(products);
   }, [products]);

   useEffect(()=>{
    fetchProducts();
  }, [])

  if(products.length <= 0){
    return <Loader/>
  }

  return (
    <div>
      <h1>Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map(product => (
            <ProductCard product={product} key={product._id}/>
          ))}
      </div>
    </div>
  )
}

export default page