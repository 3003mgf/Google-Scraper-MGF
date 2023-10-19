'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TailSpin } from "react-loader-spinner";

type Props = {
  pending: boolean
};

const SearchButton = ({pending}:Props) => {

  return ( 
    <button className="flex items-center justify-center bg-blue-500 w-[3.2rem] h-[3.2rem] hover:bg-blue-700 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 rounded-full">
      {pending ? (
        <TailSpin
          height="16"
          width="16"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ):(
        <MagnifyingGlassIcon className="h-5 w-5 text-white"/>
      )}
    </button>
   );
}
 
export default SearchButton;