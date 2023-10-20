'use client'

import { TailSpin } from 'react-loader-spinner';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingPage = () => {
  return ( 
    <div className='flex'>
      {/* Sidebar */}
      <div className="w-32 sm:w-40 md:w-60">
        <div className="space-y-2">
            {[...Array(7)].map((_, index)=>(
              <div key={index} className={`p-5 border rounded-r-lg lg:rounded-lg bg-[#fafafa]`}>
                <p className="text-xs lg:text-sm font-semibold">
                  <Skeleton/>
                </p>
                <div className="flex flex-col font-extralight text-xs tracking-wide space-y-1 mt-2">
                  <Skeleton count={Math.floor(Math.random() * 5) + 1}/>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Main Body */}
      <div className="px-4 lg:p-10 lg:pt-0 space-y-5 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">

          {/* Shop On Google */}
          <div className="flex items-center space-x-2 w-full md:col-span-2 lg:col-span-3 xl:col-span-4 py-5 space-y-3 px-3 rounded-sm relative bg-[url('https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/google-background.jpeg')] bg-cover bg-center bg-no-repeat text-white">
            <div>
              <div className="flex items-center divide-x-2 space-x-2">
                <h1 className="text-xs font-LVRegular animate-pulse">
                  Loading results from Google...
                </h1>
              </div>
              {/* Showing Results */}
              <h3 className="font-LVRegular font-bold animate-pulse">
                Scraping Real Results via Oxylabs!
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-end md:pr-2">
              <TailSpin
                height="50"
                width="50"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>

          {[...Array(10)].map((item, index)=>(
            <div
              key={index}
              className={`border rounded-2xl flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out`}
            >
              <div className="p-5 border-b flex-1">
                <p className="font-LVRegular">
                  <Skeleton count={Math.floor(Math.random() * 3) + 1}/>
                </p>
              </div>

              <div className="px-5 py-3 bg-[#1B66D2] space-y-2 rounded-b-2xl text-white">
                <p className="text-xs tracking-wide"><Skeleton/></p>
                <p className="font-bold text-xs"><Skeleton/></p>
              </div>
            </div>
          ))}
        </div>  
      </div>
    </div>
   );
}
 
export default LoadingPage;