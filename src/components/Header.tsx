'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import SearchButton from "./SearchButton";
import { FormEvent, useState } from "react";
import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem
} from "@tremor/react";
import Avatar from "react-avatar";
import { useRouter } from "next/navigation";

const Header = () => {

  const router = useRouter();
  
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState("");

  // Sorters
  const [pages, setPages] = useState("");
  const [sort, setSort] = useState("r");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
   
  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(!input) return;

    setPending(true);

    const params = new URLSearchParams();

    if(pages) params.set("pages", pages.toString());
    if(sort) params.set("sortBy", sort.toString());
    if(minPrice) params.set("minPrice", minPrice.toString());
    if(maxPrice) params.set("maxPrice", maxPrice.toString());
    
    
    router.push(`/search/${input}?${params.toString()}`);
    setPending(false);
  };

  const SORT_OPTIONS = {
    r: "Default",
    rv: "By Review",
    p: "By Price (low to high)",
    pd: "By Price (high to low)" 
  };


  return ( 
    <header className="flex flex-col items-center px-2 pt-10 pb-5 
    lg:flex-row lg:space-x-6 lg:items-start
    lg:px-6 lg:pt-6 lg:pb-5">
      <Link href="/">
        <Image
          src={"https://links.papareact.com/208"}
          alt="google-logo-mgf"
          height={150}
          width={150}
          className="object-contain mr-10"
        />
      </Link>

      <div className="w-full md:max-w-2xl mt-3">
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 w-full px-4">
            {/* Input */}
            <div className="flex items-center space-x-2 bg-white shadow-lg rounded-full px-6 py-4 border-0 flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
              <input 
                onChange={(e)=> setInput(e.target.value)}
                type="text" 
                placeholder="Search..." 
                name="searchTerm"
                className="outline-none flex-1 font-LVRegular placeholder:font-LVRegular text-sm tracking-wide"  
              />
            </div>
            <button hidden type="submit">Search</button>
            {/* Search Button */}
            <SearchButton pendingS={pending}/>
          </div>

          {/* Sorters */}
          <div className="grid grid-cols-2 items-center gap-2 p-4 mx-8 lg:grid-cols-4 font-LVRegular">
            <SearchSelect 
            onValueChange={(value)=> setPages(value)}
            className="min-w-4" placeholder="# of pages">
              {[...Array(100)].map((_, i)=>(
                <SearchSelectItem key={i} value={(i + 1).toString()}>
                  {(i + 1).toString()} pages
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <Select 
            onValueChange={(value)=> setSort(value)}
            className="min-w-4" placeholder="Sort">
              {Object.entries(SORT_OPTIONS).map(([key, value])=>(
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </Select>

            <SearchSelect 
            onValueChange={(value)=> setMinPrice(value)}
            className="min-w-4" placeholder="Min Price…">
              {["", "100", "250", "500", "750", "1000"].map((_, i)=> (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Minimum" : `$${_.toString()}`}
                </SearchSelectItem>
              ))} 
            </SearchSelect>

            <SearchSelect 
            onValueChange={(value)=> setMaxPrice(value)}
            className="min-w-4" placeholder="Max Price…">
              {["", "100", "250", "500", "750", "1000"].map((_, i)=> (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Maximum" : `$${_.toString()}`}
                </SearchSelectItem>
              ))} 
            </SearchSelect>
          </div>

        </form>
      </div>

      <div className="hidden lg:flex flex-1 justify-end cursor-default">
        <Avatar name="Nacho Gramajo" round size="35" color="#C81B56" title="Website made by MGF"/>
      </div>
    </header>
   );
}
 
export default Header;