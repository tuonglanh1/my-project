export interface IPagination {
  per_page: number;
  current_page: number;
  total_items: number;
  total_pages: number;
}

export interface IIPagination {
  page_number: number;
  page_size: number;
  total_size: number;
}
