// context/UserContext.tsx
"use client";

import { createContext, useContext, useMemo, useState } from "react";

type User = {
  _id: string;
  email: string;
  username: string;
  isVerified : boolean;
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