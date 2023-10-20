import { FaceFrownIcon } from "@heroicons/react/24/solid";

const NotFound = () => {
  return ( 
    <div className="h-full flex flex-col items-center justify-center">
      <FaceFrownIcon className="h-10 w-10 text-gray-300 mb-5"/>
      <h1 className="font-bold text-sm">Whoops...</h1>
      <h2 className="font-LVWeb text-sm mt-1">It looks like the Product could not be found!</h2>
    </div>
   );
}
 
export default NotFound;