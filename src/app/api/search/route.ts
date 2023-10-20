import { NextResponse } from "next/server";
import { PageResults, SearchParams } from "../../../../typings";

export async function POST(request: Request){

  const { search, ...params } = await request.json();
  const searchParams: SearchParams = params;

  console.log(searchParams);
  

  const filters: any = [];

  Object.entries(searchParams).forEach(([key, value]) =>{
    if(value){
      filters.push({
        key,
        value: key === "sort_by" ? value : Number(value)
      })
    }
  });

  const OXY_BODY = {
    source: 'google_shopping_search',
    domain: 'com',
    query: search,
    pages: Number(searchParams.pages) || 1,
    parse: true,
    context: filters
  };

  
  const response = await fetch(`https://realtime.oxylabs.io/v1/queries`, {
    method:"POST",
    body:JSON.stringify(OXY_BODY),
    headers:{
      Authorization:"Basic " + Buffer.from(`${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`).toString("base64"),
      "Content-Type":"application/json"
    },
    cache:"no-store"
  })


  const data = await response.json(); 
   
  
  const pageResults: PageResults[] = data.results;

  return NextResponse.json(pageResults);
};