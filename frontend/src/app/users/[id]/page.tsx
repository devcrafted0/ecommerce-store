'use client'
import { User } from "@/context/userContext";
import { use, useEffect, useState } from "react";

const page = ({params} : {params : Promise<{ id: string }>}) => {
    const {id} =  use(params);
    const [user , setUser] = useState<User | null>(null);

    useEffect(()=>{
        const getUser = async () => {   
            const res = await fetch(`/api/v1/users/${id}`);
            const data = await res.json();
            setUser(data);
        }
        getUser();
    }, []);

  return (
    <div>{user?._id}</div>
  )
}

export default page