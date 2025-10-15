"use client";
import { useUser } from "@/context/userContext";
import { redirect } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  let id;

  if (user !== null) {
    const { _id } = user;
    id = _id;
  }

  redirect(`/users/user/${id}`);
  return <div></div>;
};

export default Page;