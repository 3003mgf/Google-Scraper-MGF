
import { getBaseUrl } from "@/lib/getBaseUrl";
import { ProductData } from "../../../../../typings";
import { notFound } from "next/navigation";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { useState } from "react";


export const revalidate = 300;

type Props = {
  params:{
    id: string
  }
}

const ProductPage = async({params:{id}}:Props) => {

    if(!id) return;
  
    const getProduct = await fetch(getBaseUrl(`/api/shopping/${id}`));
    
    const productData = (await getProduct.json()) as ProductData;
    
    if(!productData.content.pricing){
      notFound();
    };


  return ( 
    <div className="p-12 pt-0">
      
      <h1 className="text-2xl font-LVRegular">{productData.content.title}</h1>

      {productData.content.reviews ? (
        <div className="flex mt-4">
          {/* If the product has 4 stars, shows 4 yellow stars */}
          {[...Array.from({
            length: Math.round(productData.content.reviews.rating)
          }),
          ].map((_, i) => (
            <StarIcon key={i} className="h-4 w-4 text-yellow-500"/>
          ))}

          {/* If the product has 4 stars, then shows 1 grey star */}
          {[...Array.from({
            length: 5 - Math.round(productData.content.reviews.rating)
          })].map((_, i)=>(
            <StarIcon key={i} className="h-4 w-4 text-gray-300"/>
          ))}
        </div>
      ):(
        <div className="flex items-center space-x-1 mt-4">
          {[...Array(5)].map((_, i)=>(
            <SolidStar key={i} className="h-4 w-4 text-gray-300"/>
          ))}
          <p className="font-LVRegular text-xs tracking-wide">(0 reviews)</p>
        </div>
      )}


      <section className="flex flex-col lg:flex-row mt-5 lg:mt-0">
        <div className="lg:p-10 lg:pl-0 mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">

            {/* Main Image */}
              <img 
              src={productData.content.images?.full_size[0]}
              alt="product-image" 
              className="lg:h-80 lg:w-80 border rounded-md object-contain cursor-pointer"
              />
              

            {/* Small Images */}
            <div className="flex lg:flex-col justify-between w-full gap-2 lg:gap-0">
              {productData.content.images?.full_size.slice(1, 3).map((image, i)=> (
                <img key={i} src={image} alt="product-sm-img" className="w-[48%] h-auto lg:w-[9.5rem] lg:h-[9.5rem] object-contain border rounded-md"/>
              ))}
            </div>
          </div>
          
          {/* Small Images Scrollable */}
          <div className="flex space-x-6 overflow-x-scroll no-scrollbar py-4 pt-5 lg:w-[30rem]">
            {productData.content.images?.full_size.slice(3).map((image, i)=>(
              <img key={i} src={image} alt="product-xs-img" className="w-20 h-20 object-contain"/>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1 pt-10">
          {productData.content.pricing.online[0].details && (
            <>
              <h3 className="font-bold text-xl">Product Details</h3>
              <p className="text-lg font-LVRegular mt-2">
                ${productData.content.pricing.online[0].price_total}&nbsp;
                {productData.content.pricing.online[0].currency}
              </p>

              <div className="flex space-x-4 mt-1">
                <p className="text-xs text-gray-600 tracking-wide">
                  ({productData.content.pricing.online[0].price}&nbsp;
                  {productData.content.pricing.online[0].currency} +&nbsp;
                  {productData.content.pricing.online[0].price_tax}&nbsp;
                  {productData.content.pricing.online[0].currency} tax)
                </p>

                {productData.content.pricing.online.length > 1 && (
                  <p className="text-xs text-pink-700">
                    + {productData.content.pricing.online.length - 1} more prices
                  </p>
                )}
              </div>

              <p className="text-xs bg-gradient-to-r from-pink-800 via-pink-700 to-pink-600 text-white mt-5 w-fit px-3 py-1">
                {productData.content.pricing.online[0].details}
              </p>
            </>
          )}

          <hr className="my-5"/>
          <div className="bg-[#f6f6f6] p-4">
            <p className="font-LVRegular tracking-wide">{productData.content.description}</p>
          </div>
        
          {/* Highlight */}
          {productData.content.highlights && (
            <div className="mt-8 space-y-2">
              <h3 className="font-bold text-xl">Product Highlights</h3>
              <hr className="mb-2"/>
              <div className="space-y-2 flex flex-col items-start justify-start">
                {productData.content.highlights?.map((highlight, i) =>(
                  <span key={i} className="font-LVWeb text-sm">
                    • {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      


      {/* REVIEWS */}
      <section className="mt-10 mb-4">
        {productData.content.reviews ? (
          <div>
            <h4 className="font-bold text-xl">Top Review</h4>
            {productData.content.reviews.top_review && (
              <div className="border shadow-md p-5 rounded-lg mt-2">
                <div className="flex space-x-1 items-center">
                  <p className="font-semibold capitalize text-sm">
                    {productData.content.reviews.top_review.author} says:
                  </p>
    
                  <p className="text-sm tracking-wide font-light">{productData.content.reviews.top_review.title}</p>
                </div>
                <div className="flex space-x-1 mt-2 mb-4">
                  {[
                    ...Array.from({
                      length: Math.round(
                        productData.content.reviews.top_review.rating
                      )
                    })
                  ].map((_, i)=> (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-500"/>
                  ))}
    
                  {[
                    ...Array.from({
                      length: 5 - Math.round(
                        productData.content.reviews.top_review.rating
                      )
                    })
                  ].map((_, i)=> (
                    <StarIcon key={i} className="h-4 w-4 text-gray-400"/>
                  ))}
                </div>
    
                <p className="text-sm tracking-wide font-LVWeb">{`"${productData.content.reviews.top_review.text}"`}</p>
              </div>
            )}
          </div>
        ):(
          <div>
            <h3 className="font-bold text-xl">Reviews</h3>
            <div className="flex items-center space-x-2 mt-3">
            <FaceFrownIcon className="h-4 w-4 text-pink-700"/>
              <h4 className="font-LVWeb tracking-wide text-sm text-gray-500">{"No Review's yet"}</h4>
            </div>
          </div>
        )}
      </section>


      {/* Specifications */}
      {productData.content.specifications && (
        <section>
          <hr className="my-10"/>

          <h3 className="font-bold text-xl mb-2">Specifications</h3>

         
          <div className="flex space-x-5 mt-3 bg-[#f6f6f6] p-4">
            {productData.content.specifications.map((spec)=>(
              <div key={spec.section_title}>
                {/* <h5 className="font-bold my-2 text-lg font-LVRegular">
                  {spec.section_title}
                </h5> */}

                {spec.items.map((items, i)=>(
                  <div key={i} className="text-sm mb-5">
                    <h5 className="font-bold font-LVRegular tracking-wide">• {items.title}</h5>
                    <p className="ml-[0.85rem] font-LVWeb tracking-wide">{items.value}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
      
    </div>
   );
}
 
export default ProductPage;