import { Injectable } from "@angular/core";

class Pagination {
  pageSize: number;
  pageIndex: number;
  total: number;
}

@Injectable()
export class DataTableBase<T> {
  protected filterForm: any;
  protected dataSet: Array<T>;
  protected pagination: Pagination;
}
