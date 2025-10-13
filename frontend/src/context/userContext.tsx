// context/UserContext.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  _id: string;
  username: string;
  email: string;
  fullName : {
    firstname : string; 
    lastname : string
  };
  isVerified : boolean;
  avatar : string;
  coverImage : string;
  watchHistory : [];
  role : string;
  createdAt : Date;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async() => {
    const res = await fetch('http://localhost:8000/api/v1/users/me', {
      credentials: "include",
    });
    const user = await res.json();
    setUser(user.data);
  }

  useEffect(()=>{
    fetchUser();
  }, []);

  useEffect(()=>{
    // console.log(user);
  }, [user])

   const value = useMemo(() => ({ user , setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useAuth must be used inside a AuthProvider");
  return ctx;
}