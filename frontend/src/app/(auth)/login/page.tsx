'use client'

import FormStatus from "@/components/main/FormStatus";
import { Response, useAuth } from "@/context/authContext"
import { useUser } from "@/context/userContext";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const {email , setEmail ,otpResponse} = useAuth();
  const {user, setUser} = useUser();

  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [response , setResponse] = useState<Response>({});
  
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/v1/users/login', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      // THis data have statusCode and also the message Confrimed
      const data = await res.json();

      if (!data.success) {
        setResponse(data);
      }else{
        setUser(data.data.user);
      }

      if(data.hasOwnProperty('isVerified')){
        if(!data.isVerified){
          router.push('/otp')
        }
      }
      setLoading(false);

      if(data.success){
        router.push('/page');
      }

    } catch (err: any) {
      setResponse(err.message);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      {otpResponse.statusCode === 200 && <FormStatus success={true} text={otpResponse.message!}/>}
      
      <form onSubmit={handleLogin} className="md:w-96 w-80 flex flex-col items-center justify-center">
        <div className="w-full">
          {!response.success && <FormStatus success={response.success} text={response.message!}/>}
        </div>
        <h2 className="text-4xl text-gray-900 font-medium">Login</h2>
        <p className="text-sm text-gray-500/90 mt-3">
          Welcome Back! Please Login to continue
        </p>

        {/* Username or email */}
        <div className="has-[:focus]:border-primary/90 transition-colors duration-150 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden px-6 gap-2 mt-6">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="text"
            placeholder="Username or email"
            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="has-[:focus]:border-primary/90 transition-colors duration-150 flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden px-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500/80 scale-80 cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
        </div>

        <button
            type="submit"
            className={`mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity ${loading ? 'opacity-90' : 'opacity-100'}`}
            
          >
            {loading ? 'Processing...' : 'Loign'}
        </button>
        <p className="text-gray-500/90 text-sm mt-4">
            Don't have an account?{" "}
            <Link  href="/register" className="text-primary hover:underline" >
              Register
            </Link>
          </p>
      </form>

    </div>
  )
}

export default page