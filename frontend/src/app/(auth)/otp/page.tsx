'use client'

import FormStatus from "@/components/main/FormStatus";
import OtpInput from "@/components/OtpInput";
import ResendOTPButton from "@/components/ResendOTPButton";
import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const page = () => {

    const {email , setEmail , response , setResponse , otpResponse , setOtpResponse} = useAuth();
    const router = useRouter();
    
    const hasRun = useRef<boolean>(false);

    const resendOTP = async () => {
      const res = await fetch('http://localhost:8000/api/v1/users/resend-otp', {
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
      const statusCode = await res.status;
      const data = await res.json();

      setResponse({...data , statusCode})
    }
    
    useEffect(()=>{
      if(hasRun.current) return;
      hasRun.current = true;
      if(email === ''){
        router.push('/')
      } else {
        resendOTP();
      }
    }, []);

    const [otpValue, setOtpValue] = useState<string>('');

    const handleOtpChange = (value: string) => {
      setOtpValue(value);
    };

    useEffect(()=>{
      if(otpResponse.statusCode === 200){
        router.push('/login');
      }
    }, [otpResponse])

    const handleSubmit = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email ,  otp : otpValue}),
        });
        const statusCode = res.status;
        const data = await res.json();
        setOtpResponse({statusCode, ...data});
      } catch (error) {
        if(error instanceof Error){
          setResponse((prev)=>(
            {
              ...prev,
              message : error.message
            }
          ))
        }
      }
    }

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div>
        {response.statusCode === 201 && <FormStatus success={true} text={response.message!}/>}

        {otpResponse.statusCode !== 200 && <FormStatus success={false} text={otpResponse.message!}/>}
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Enter OTP for Verification
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              We’ve sent a 6-digit code to your email address.
            </p>

            <div className="flex flex-col items-center gap-6">
              <OtpInput onChange={handleOtpChange} />
              <button
                onClick={handleSubmit}
                className="cursor-pointer w-full py-2.5 rounded-lg bg-primary hover:opacity-90 text-white font-medium transition-colors duration-200">
                Verify
              </button>
            </div>

            <div className="my-3 w-full">
              <ResendOTPButton onResend={()=>resendOTP()}/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page;