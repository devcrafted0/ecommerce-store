'use client'
import { useEffect, useState } from "react";
import ToggleButton from "./main/ToggleButton";

export type FiltersType = {
    category : string,
    deals : boolean,
    price : {min : string | boolean , max : string}
}

const FilterMainPage = () => {

    const [filters, setFilters] = useState<FiltersType>({
        category: '',
        deals: false,
        price: {
            min: '0',
            max: '0'
        }
    });

    useEffect(()=>{
        console.log(filters);
    }, [filters])

    const resetFilters = () => {
        setFilters({
            category : '',
            deals : false,
            price : {
                min : '0',
                max : '0',
            }
        })
    }
    

  return (
    <div className="[@media(max-width:1445px)]:w-[250px] w-[17vw] h-full p-5 flex flex-col">
        <div className="w-full p-2 flex justify-between">
            <h1 className="font-semibold tracking-wide text-lg">Filters</h1>
            <button onClick={()=>window.location.reload()} className="font-semibold outline-none border-none text-primary cursor-pointer">Reset</button>
        </div>

        <div className="bg-[#F8F7F8] rounded-lg w-full h-full p-6 flex flex-col gap-3">
            <ToggleButton name="Deals" value1="deals" value2={filters.deals ? false : true} setFilters={setFilters}/>

            <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-semibold">Category</h1>
                <ToggleButton id="1" group="categories" name="Fruits" value1="category" value2='fruits' setFilters={setFilters} />
                <ToggleButton id="2" group="categories" name="Vegetables" value1="category" value2='vegetables' setFilters={setFilters} />
                <ToggleButton id="3" group="categories" name="Drinks" value1="category" value2='drinks' setFilters={setFilters} />
                <ToggleButton id="4" group="categories" name="Cheese" value1="category" value2='cheese' setFilters={setFilters} />
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <h1 className="font-semibold">Price</h1>
                <ToggleButton id="5" group="price" name="$5 - $10" value1="price" value2='5' value3="10" setFilters={setFilters} />
                <ToggleButton id="6" group="price" name="$10 - $20" value1="price" value2='10' value3="20" setFilters={setFilters} />
                <ToggleButton id="7" group="price" name="$20 - $50" value1="price" value2='20' value3="50" setFilters={setFilters} />
                <ToggleButton id="8" group="price" name="$50 & Above" value1="price" value2='50' value3="10000" setFilters={setFilters} />
            </div>
        </div>
    </div>
  )
}

export default FilterMainPage