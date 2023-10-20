import Link from "next/link";
import { PageResults } from "../../typings";
import { InformationCircleIcon, LinkIcon } from "@heroicons/react/24/solid";

type Props = {
  results: PageResults[];
  term: string;
}

const ResultsList = ({results, term}:Props) => {
  
  return ( 
    <div className="flex">
      {/* Sidebar */}
      <div className="w-32 sm:w-40 md:w-60">
        {results.map((pageResult, index)=>{
          if(index === 0){
            return(
              <div key={pageResult.job_id} className="space-y-2">
                {pageResult.content?.results?.filters?.map((filter, index)=>(
                  <div key={index} className={`p-5 border rounded-r-lg lg:rounded-lg bg-[#fafafa]`}>
                    <p className="text-xs lg:text-sm font-semibold">{filter.name}</p>
                    <div className="flex flex-col font-extralight text-xs tracking-wide space-y-1 mt-2">
                      {filter.values.map((value, i) => (
                        <Link
                          key={i}
                          href={`https://www.google.com${value.url}`}
                          prefetch={false}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          • {value.value}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        })}
      </div>

      {/* Main Body */}
      <div className="px-4 lg:p-10 lg:pt-0 space-y-5 flex-1">
        {results.map((pageResult, i)=> (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {/* Divider */}
            {i !== 0 && <hr className="w-full col-span-full"/>}

            {/* Shop On Google */}
            <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 py-5 space-y-3 px-3 rounded-sm relative bg-[url('https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/FrontAssets/google-background.jpeg')] bg-cover bg-center bg-no-repeat text-white">
              <div className="flex items-center divide-x-2 space-x-2">
                <h1 className="text-xs font-LVRegular">Shop On Google with MGF</h1>
              </div>
              {/* Showing Results */}
              <h3 className="font-LVRegular font-bold">
                {`Showing results for "${decodeURIComponent(term)}"`}
              </h3>
              <div className="absolute top-1/2 -translate-y-1/2 right-5 h-full pt-2">
                <span className="font-bold text-6xl">
                  {i + 1}
                </span>
              </div>
            </div>
            {pageResult.content?.results?.organic?.map((item)=>(
              <Link
                key={item.pos}
                prefetch={false}
                href={item.url.includes("url?url=") ?
                // send to external URL
                item.url.split("url?url=")[1] :

                // send to internal URL
                item.url.split("?")[0]
              } 
              className={`border rounded-2xl flex flex-col hover:shadow-lg transition-shadow duration-200 ease-in-out`}
              >
                <div className="p-5 border-b flex-1">
                  <p className="font-LVRegular">{item.title}</p>
                </div>

                <div className="px-5 py-3 bg-[#1B66D2] space-y-2 rounded-b-2xl text-white relative">
                  <p className="text-xs tracking-wide">{item.price_str} {item.currency}</p>
                  <p className="font-bold text-xs">{item.merchant.name}</p>
                  {
                    item.url.includes("url?url=") && (
                      <div className="absolute top-1/2 -translate-y-1/2 right-3">
                        <LinkIcon className="h-4 w-4 text-white"/>
                      </div>
                    )
                  }
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
   );
}
 
export default ResultsList;