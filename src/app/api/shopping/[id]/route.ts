import { NextResponse } from "next/server";
import { ProductData } from "../../../../../typings";

type Params = {
  params:{
    id: string
  }
};

export async function GET(request: Request, {params:{id}}:Params){
  
  
  if(!id){
    console.log("error");
    
      return NextResponse.next(
        new Response("Missing product ID", {
          status:400
        })
      )
  };

  const OXY_BODY = {
    source: 'google_shopping_product',
    domain: 'com',
    query: id,
    parse: true
  };
  

  // Get product info
  const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
    method: 'POST',
    body: JSON.stringify(OXY_BODY),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`).toString('base64'),
    },
    cache:"no-store"
  });

  const productInfo = await response.json();

  
  

  if(productInfo.length === 0){
    return NextResponse.next(
      new Response("No product found", {
        status: 404
      })
    );
  };

  const productData: ProductData = productInfo.results[0];
  
  return NextResponse.json(productData);
}