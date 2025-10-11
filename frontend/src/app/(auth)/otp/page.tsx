'use client'

import FormStatus from "@/components/main/FormStatus";
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation";

const page = () => {

    const {email , setEmail , response , setResponse} = useAuth();
    const router = useRouter();
    
    if(email === ''){
        router.push('/')
    }
  return (
    <div>
        <div className="w-full">
          {response.statusCode === 201 && <FormStatus success={true} text={response.message!}/>}
        </div>
        {email}
    </div>
  )
}

export default page;