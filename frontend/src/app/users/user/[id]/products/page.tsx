import { use } from "react";

const page = ({params} : {params : Promise<{ id: string }>}) => {
   const { id } = use(params);
  return (
    <div>Products</div>
  )
}

export default page