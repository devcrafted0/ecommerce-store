import { redirect } from "next/navigation"

const Page = () => {
    redirect('/users/dashboard/add-products');
  return (
    <div></div> 
  )
}

export default Page;