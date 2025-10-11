"use client";

import assets from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AtSign, Eye, EyeOff, IdCard, User } from "lucide-react";
import FormStatus from "@/components/main/FormStatus";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

type RegisterError = {
  username? : string,
  email? : string,
  password? : string,
  confirmPassword? : string
}

interface TouchedFields {
  email: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
}

interface FormDataForErrors {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const page = () => {
  // const [email, setEmail] = useState<string>("");
  const {email , setEmail, response , setResponse} = useAuth();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState<RegisterError>({})
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const validate = (data: FormDataForErrors, touched: TouchedFields): RegisterError => {
    const newErrors: RegisterError = {};

    // Email validation
    if (touched.email) {
      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        newErrors.email = "Invalid email address";
    }

    // Username validation
    if (touched.username) {
      if (!data.username.trim()) newErrors.username = "Username is required";
      else if (!/^[a-zA-Z0-9_]{3,20}$/.test(data.username))
        newErrors.username = "Username must be 3–20 characters, letters/numbers only";
    }

    // Password validation
    if (touched.password) {
      if (!data.password.trim()) newErrors.password = "Password is required";
      else if (data.password.length < 8)
        newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm Password validation
    if (touched.confirmPassword) {
      if (data.confirmPassword !== data.password)
        newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  useEffect(() => {
    setErrors(validate({email , password ,confirmPassword , username}, touched));
  }, [email,  touched , password , confirmPassword , username]);

  const router = useRouter();

  useEffect(() => {
    console.log({
      email,
      firstname,
      lastname,
      username,
      password,
      confirmPassword,
      response
    });
  }, [response, email, firstname, lastname, username, password, confirmPassword]);

  useEffect(()=>{
    if(response.statusCode === 201){
      router.push('/otp');
    }
  }, [response]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    setLoading(true);

    const keys = Object.keys(errors);
    const objectLength = keys.length;

    if(objectLength > 0){

    } else{
      try {
        const res = await fetch('http://localhost:8000/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email , firstname , lastname , username , password}),
        });

        const statusCode = res.status;

        const data = await res.json();

        setResponse({...data , statusCode});
        setLoading(false);
      } catch (error : unknown) {
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
  };

  return (
    <div className="flex h-[700px] w-full mt-25">
      <div className="w-full flex flex-col items-center justify-center">
        
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <div className="w-full">
            {response.statusCode !== 201 && <FormStatus success={response.success} text={response.message!}/>}
          </div>
          <h2 className="text-4xl text-gray-900 font-medium">Register</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Hy There! Please create a acccount to continue
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full cursor-pointer hover:bg-gray-500/15 transition-colors duration-150"
          >
            <Image
              width={100}
              height={100}
              src={assets.googleLogo}
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* FirstName and lastname */}
          <div className="flex gap-3">
            <div className="has-[:focus]:border-primary/90 transition-colors duration-150 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden px-5 gap-2">
              <span className="scale-70 text-gray-500/80">
                <User />
              </span>
              <input
                type="text"
                placeholder="Firstname"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>

            <div className="has-[:focus]:border-primary/90 transition-colors duration-150 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden px-5 gap-2">
              <span className="scale-70 text-gray-500/80">
                <IdCard />
              </span>
              <input
                type="text"
                placeholder="Lastname"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="has-[:focus]:border-primary/90 transition-colors duration-150 flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden mt-6 px-5 gap-2">
            <span className="scale-70 text-gray-500/80">
              <AtSign />
            </span>
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched({ ...touched, username: true })}
            />
          </div>

          {errors.username && <span className="mt-3 text-sm text-center text-red-500">{errors.username}</span>}

          {/* Email */}
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
              type="email"
              placeholder="Email"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
            />
          </div>

          {errors.email && <span className="text-sm mt-3 text-center text-red-500">{errors.email}</span>}

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
              onBlur={() => setTouched({ ...touched, password: true })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500/80 scale-80 cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>

          {errors.password && <span className="text-sm mt-3 text-center text-red-500">{errors.password}</span>}

          {/* Confirm Password */}
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
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-500/80 scale-80 cursor-pointer"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>

          {errors.confirmPassword && <span className="text-sm mt-3 text-center text-red-500">{errors.confirmPassword}</span>}

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input
                className="h-5 accent-primary"
                type="checkbox"
                id="checkbox"
              />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline" href="#">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={`mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity ${loading ? 'opacity-90' : 'opacity-100'}`}
            
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <a className="text-primary hover:underline" href="#">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
