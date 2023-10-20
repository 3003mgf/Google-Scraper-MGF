
export const getBaseUrl = (route:string) =>{
  if(process.env.NODE_ENV === "production"){
    return `https://${process.env.VERCEL_URL + route}`
  }else{
    return `http://localhost:3000${route}`;
  }
};