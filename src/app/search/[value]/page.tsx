import { redirect } from "next/navigation";
import { PageResults, SearchParams } from "../../../../typings";
import { getBaseUrl } from "@/lib/getBaseUrl";
import ResultsList from "@/components/ResultsList";
import { useState } from "react";

export const revalidate = 300;

type Props = {
  searchParams: SearchParams,
  params: {
    value: string
  }
};


const SearchPage = async({searchParams, params: { value }}:Props) => {
  
  // We protect the route "search"
  if(!value){
    redirect("/");
  };


  // Call API
  const response = await fetch(getBaseUrl("/api/search"), {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({search: value, ...searchParams})
  });

  const results = await response.json();
  

  return ( 
    <div>
      <ResultsList results={results} term={value}/>
    </div>
   );
}
 
export default SearchPage;