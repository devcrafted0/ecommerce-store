"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface DashboardContextType { editId: string; setEditId: React.Dispatch<React.SetStateAction<string>>}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [editId , setEditId] = useState<string>('');

  const value = useMemo(() => ({ editId , setEditId }), [editId]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside a DashboardProvider");
  return ctx;
}