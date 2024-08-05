export * from './tcp.service';
export interface IBaseGetAllResult {
  data: Array<any>;
  meta?: {
    perPage?: Number;
    currentPage?: Number;
    totalItems?: Number;
    totalPages?: Number;
  };
  query?: any;
  metaData?: any;
}

export interface IRowImportError {
  row_number: Number;
  message: string;
}
