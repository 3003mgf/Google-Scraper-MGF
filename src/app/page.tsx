import { ArrowDownCircleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const SEARCH_ITEMS = [
  {
    id: 1,
    term: "Monitors",
    url: "/search/monitors?sort_by=r&min_price=500",
    color: "bg-blue-500"
  },
  {
    id: 2,
    term: "Macbook Pro",
    url: "/search/macbook?sort_by=r&min_price=800",
    color: "bg-red-500"
  },
  {
    id: 3,
    term: "Iphone 14",
    url: "/search/iphone",
    color: "bg-yellow-500"
  },
  {
    id: 4,
    term: "Airpods Pro",
    url: "/search/airpods",
    color: "bg-green-500"
  },
  {
    id: 5,
    term: "Speakers under $300",
    url: "/search/speakers?sort_by=r&max_price=500",
    color: "bg-purple-500"
  },
]

export default function Home() {
  return (
    <div className="p-10 pt-0 text-center lg:text-left">
      <h1 className="font-semibold font-mono tracking-wide my-2 mt-5 mb-4">
        Welcome to MGF Google Shopping
      </h1>
      <h2 className="text-xs font-extralight tracking-wider">
        Get started by clicking on one of the example search items or typing in an item yourself above!
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center gap-5 mt-5 bg-[#f7f7f7] p-7">
        {SEARCH_ITEMS.map((item)=> (
          <Link
            key={item.id}
            prefetch={false}
            href={item.url}
            className={`${item.color} w-full h-24 sm:h-36 hover:opacity-50 text-white py-2 px-4 rounded flex items-center justify-center font-bold font-LVRegular tracking-wide`}
          >
            {item.term}
          </Link>
        ))}
      </div>
    </div>
  )
}
