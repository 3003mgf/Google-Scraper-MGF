import Skeleton from "react-loading-skeleton";

const LoadingPage = () => {
  return ( 
    <div className="p-5 lg:p-12">
        <Skeleton/>
        <Skeleton width={200}/>

        <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start lg:flex-row lg:p-10 m-5">
          <Skeleton width={400} height={350}/>
          <div className="m-5">
            <Skeleton width={300}/>
            <Skeleton width={250}/>
            <Skeleton width={200}/>
            <br />
            <Skeleton height={100} width={400}/>
            <br />
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </div>
        </div>
    </div>
   );
}
 
export default LoadingPage;