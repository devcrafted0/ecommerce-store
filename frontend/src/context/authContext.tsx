// This context file is used for to send the email from the register to the otp page and also from the login to the otp page.

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

export type Response = {
  message? : string;
  success? : boolean;
  statusCode? : number;
  data? : object
}

interface AuthContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  response: Response;
  setResponse: React.Dispatch<React.SetStateAction<Response>>;
  otpResponse: Response;
  setOtpResponse: React.Dispatch<React.SetStateAction<Response>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string>('');
  const [response , setResponse] = useState<Response>({});
  const [otpResponse  , setOtpResponse] = useState<Response>({});

  const value = useMemo(() => ({ email, setEmail , response , setResponse , otpResponse , setOtpResponse }), [email , response , otpResponse]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside a AuthProvider");
  return ctx;
}