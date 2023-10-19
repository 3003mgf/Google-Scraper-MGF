// NOTE: It seems we have to export it to use it in the route
export type SearchParams = {
  pages?:string;
  sortBy?:string;
  minPrice?:string;
  maxPrice?:string;
};


type PageResults = {
  content: Content,
  created_at: string;
  updated_at: string;
  page: Number;
  url: string;
  job_id: string;
  status_code: number;
  parser_type: string;
};

type Content = {
  url: string;
  pagel: number;
  results: Results;
  last_visible_page: number;
  parse_status_code: number;
};

type Results = {
  paid: any[];
  filters: Filter[];
  organic: Organic[];
  search_information:{
    query: string;
    showing_results_for: number;
  }
};

type Filter = {
  name:string;
  values: Value[]
};

type Value = {
  url: string;
  value: string
}

type Organic = {
  pos:number;
  url:string;
  type:string;
  price:number;
  title:string;
  currency:string;
  merchant:{
    url:string;
    name:string;
  };
  price_str:string;
  pos_overall:number;
};