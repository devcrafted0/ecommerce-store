'use client'

import { useAuth } from "@/context/authContext";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {

    const {setResponse} = useAuth();
    const {setUser} = useUser();

    const router = useRouter();

    const logout = async () => {
        const res = await fetch('/api/v1/users/logout', {
            method : 'POST',
            credentials: "include",
        });
        if(res.status === 200){
            setUser(null);
            setResponse(await res.json());
            router.push('/login')
        }
    }

    useEffect(()=>{
        logout();
    }, [])

  return (
    <div>Signing Out...</div>
  )
}

export default page