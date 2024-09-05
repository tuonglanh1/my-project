import { PageParams } from '../paging/paginable';

export interface ICrudQuery {
  filter: any;
  sort: any;
  page: PageParams;
  projection: any;
  population: any;
}
