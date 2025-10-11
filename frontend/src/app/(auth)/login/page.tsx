'use client'

import FormStatus from "@/components/main/FormStatus";
import { useAuth } from "@/context/authContext"

const page = () => {
  const {otpResponse} = useAuth();
  return (
    <div>
      {otpResponse.statusCode === 200 && <FormStatus success={true} text={otpResponse.message!}/>}
    </div>
  )
}

export default page